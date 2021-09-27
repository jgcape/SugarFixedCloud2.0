require('dotenv').config();
var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");

// Load Sugar model
const Sugar = require('../models/Sugars');

router.get('/', (req, res) => {
    var userID = req._passport['session']['user']
    Sugar.find({userID: userID}).sort({date: -1}).exec(function(err, result) { 
        res.json({
            statusCode:200,
            data: result.sugars,
            message: "Sucess: retrieved latest result"
        });
    });
});

router.get('/latest', (req, res) => {
    var userID = req._passport['session']['user']
    Sugar.findOne({userID: userID}).sort({date: -1}).exec(function(err, result) { 
        res.json({
            statusCode:200,
            data: result.sugars,
            message: "Sucess: retrieved latest result"
        });
    });
});

module.exports = router;