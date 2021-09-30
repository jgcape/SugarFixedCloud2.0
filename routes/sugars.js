require('dotenv').config();
var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");

router.get('/', (req, res) => {
    var userID = req._passport['session']['user']
    Controllers.sugarsController.getUserSugars(userID, res);
});

router.get('/latest', (req, res) => {
    var userID = req._passport['session']['user']
    Controllers.sugarsController.getUserResult(userID, res);
});

module.exports = router;