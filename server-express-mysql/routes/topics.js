var express = require("express");
var router = express.Router();
var models = require("../models");
const db = require("../models/index");
const QueryTypes = require("sequelize");
const { DateTime } = require("luxon");

router.get("/", function(req, res, next) {
    models.topic.findAll().then(response => {
        res.json(response);
    })
    .catch(error => res.json({error: error}));
});

router.post("/create", function(req, res, next) {
    let { email, password, heading, body  } = req.body;
    models.user.findOne({
        where: {
            email: email,
            password: password
        }
    })
    .then(response => {
        console.log(response.dataValues.active)
        console.log(heading)
        console.log(body)
        if (response.dataValues.active) {
            models.topic.findOrCreate({
                where: {
                    userId: response.dataValues.id,
                    heading: heading,
                    body: body
                }
            })
            .spread((response, created) => {
                console.log("RESPONSE", response);
                console.log(created)
                if (created) {
                    res.json({success: true,...response.dataValues});
                } else {
                    res.json({success: false, error: 'Cannot create duplicate topic'});
                }
            })
            .catch(error => res.json({error: 'Cannot create post'}));
        } else {
            res.json({success: false, error: 'User is not active user'});
        }
    })
    .catch(error => res.json({success: false, error: 'User does not exist'}));
})

router.delete("/delete", function(req, res, next) {
    let { email, password, topicId } = req.body;
    models.user.findOne({
        where: {
            email: email,
            password: password
        },
        attributes: ['id']
    })
    .then(response => {
        console.log(response);
        models.topic.destroy({
            where: { 
                userId: response.dataValues.id,
                topicId: topicId,
            }
        })
    })
    .then(response => res.json({success: true, message: "Topic deleted"}))

    .catch(error => res.json({success: false, error: "Cannot complete delete"}));
})

module.exports = router;