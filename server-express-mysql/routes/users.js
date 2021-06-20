var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", function(req, res, next) {

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
        let finalResult = {...results.dataValues, success: true}
        res.json(finalResult);
    })
    .catch(error => {
        res.json({success: false, error: "An error occurred"})
    })
});

// router.post("/signup", function(req, res, next) {
//     let { newUser } = req.body; 
//     models.user.findOrCreate({ newUser });
// });

module.exports = router;