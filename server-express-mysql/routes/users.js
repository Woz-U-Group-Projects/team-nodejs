var express = require("express");
var router = express.Router();
var models = require("../models");
var nodemailer = require("nodemailer");
const db = require("../models/index");
const QueryTypes = require("sequelize");
const { DateTime } = require("luxon");

async function emailServer(receiverEmail, confirmationCode) {
  const { 
      EMAIL_ACCOUNT_ADMINISTRATOR, 
      EMAIL_ADDRESS, 
      EMAIL_PASSWORD,
      OUTGOING_EMAIL_SERVER,
      SERVER_PORT
  } = process.env;

  let senderAddress = `${EMAIL_ACCOUNT_ADMINISTRATOR} <${EMAIL_ADDRESS}>`;
  
  let subjectLine = `Confirmation Code for New Chat Bubbles Account`;

  let textBody = `
    Enter the following confirmation code within 1 hour to confirm this email 
    for Chat Bubbles! Confirmation Code: ${confirmationCode}`;

  let htmlBody = `
    <p>Enter the following confirmation code within 1 hour to confirm this email
    for Chat Bubbles!</p>
    <p></p>
    <p>Confirmation Code:</p>
    <b>${confirmationCode}</b>`;

  let transporter = nodemailer.createTransport({
    host: OUTGOING_EMAIL_SERVER, //user provided email server
    port: SERVER_PORT, //user provided port (587 should be used)
    secure: false, 
    auth: {
      user: EMAIL_ADDRESS, //user provided email address
      pass: EMAIL_PASSWORD, //user provided password for email server
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: senderAddress,
    to: receiverEmail, 
    subject: subjectLine, 
    text: textBody, 
    html: htmlBody, 
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}

router.get("/", function(req, res, next) {
    models.user.findAll({}).then(response => {
        res.json(response);
    })
    .catch(error => res.send(error));
});

router.post("/login", function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    models.user.findOne({
        where: {
            email: email,
            password: password
        }
    })
    .then(results => {
        let finalResult = {...results.dataValues, success: true};
        res.json(finalResult);
    })
    .catch(error => {
        res.json({success: false, error: "An error occurred"});
    });
});

router.post("/signup", function(req, res, next) {
    let { email, password } = req.body; 
    models.user.findOrCreate({ 
        where: {
            email: email,
            password: password,
            active: false
        }
    })
    .spread((response, created) => {
        if (created) {
            const code = String(Math.floor(Math.random() * 1000000));
            let dt = DateTime.now().plus({ hours: 1 }).toISO();
            emailServer(email, code).catch(console.error);
            models.confirmation_code.create({
                confirmation_code: code,
                expires_at: dt
            })
            .then(results => {
                const queryText = `
                    UPDATE users 
                    SET code_id = :code_id 
                    WHERE id = :id`;
                return db.sequelize.query(queryText,
                    {
                        replacements: { code_id: results.dataValues.code_id, id: response.dataValues.id },
                        type: QueryTypes.UPDATE
                    }
                )
            })
            .then(response => response) 
            .catch(error => console.log(`Code_id not created for id: ${response.dataValues.id}`))
            let finalResult = {...response.dataValues, success: true};
            res.json(finalResult);  
        } else {
            res.json({success: false, message: 'This user already exists'});
        }
        return response
    })
    .then(response => response)
    .catch(error => {
        res.json({success: false, error: 'An error occurred'});
    });
});

router.post("/confirm", function(req, res, next) {
    const { email, confirmationCode } = req.body;
    const confirmationCodeQueryText = `
        SELECT confirmation_code, expires_at FROM users 
        JOIN confirmation_codes 
        ON users.code_id = confirmation_codes.code_id 
        WHERE email = :email`;
    const activateUserQueryText = `
        UPDATE users
        SET active = true
        WHERE email = :email`;
    const deactivateUserQueryText = `
        DELETE users.*, confirmation_codes.* 
        FROM confirmation_codes 
        JOIN users 
        ON users.code_id = confirmation_codes.code_id 
        WHERE email = :email`
    
    db.sequelize.query(confirmationCodeQueryText,
        {
            replacements: { email: email },
            type: QueryTypes.SELECT
        }
    )
    .then(response => {
        let results = response[0][0];
        let preformattedExpiresAt = results.expires_at.toString().slice(0, 33).replace("GMT", "");
        let currentTimeUTC = DateTime.utc().toISO();
        let currentTimeUTCDuration = DateTime.fromISO(currentTimeUTC);
        let codeExpirationDuration = DateTime.fromFormat(preformattedExpiresAt, "EEE MMM dd yyyy HH:mm:ss ZZZ");
        let timeDifference = codeExpirationDuration.diff(currentTimeUTCDuration, ['minutes']).toObject();

        if (results.confirmation_code == confirmationCode) {
            if (timeDifference.minutes > 0) {
                db.sequelize.query(activateUserQueryText, {
                    replacements: { email: email },
                    type: QueryTypes.UPDATE})
                .then(response => {
                    console.log(response);
                    res.json({success: true, ...results});
                })
            } 
            else {
                db.sequelize.query(deactivateUserQueryText, {
                    replacements: { email: email },
                    type: QueryTypes.DELETE})
                .then(response => {
                    console.log(response);
                    res.json({success: false, error: 'Code has expired'});
                })
            }
        } else {
            res.json({success: false, error: 'Code does not match'});
        }
        return results;
    })
    .catch(error => {
        res.json({success: false, error: 'Unable to retrieve confirmation code'});
    });
    
})

module.exports = router;