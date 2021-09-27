require('dotenv').config();
var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");

// Load Sugar model
const Sugar = require('../models/Sugars');

router.get('/result/:userID', (req, res) => {
    Sugar.findOne({userID: req.params.userID}).sort({date: -1}).exec(function(err, result) { 
        res.json({
            statusCode:200,
            data: result.productSugars,
            message: "Sucess: retrieved latest result"
        });
    });
});

router.get('/:userID', (req, res) => {
    Sugar.find({userID: req.params.userID}).sort({date: -1}).exec(function(err, result) { 
        // res.json({
        //     statusCode:200,
        //     data: result.productSugars,
        //     message: "Sucess: retrieved latest result"
        // });
        console.log(result)
    });
});

module.exports = router;