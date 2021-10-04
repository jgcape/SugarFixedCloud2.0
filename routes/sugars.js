require('dotenv').config();
var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");

router.get('/', (req, res) => {
    var userID = req._passport['session']['user']
    Controllers.sugarsController.getUserSugars(userID, res);
});

router.patch('/:objID', (req, res) => {
    let updateData = {
        objID: req.params.objID,
        newName: req.body.newName
    }
    Controllers.sugarsController.updateProduct(updateData, res);
});

router.delete('/:objID', (req, res) => {
    let objID = req.params.objID
    Controllers.sugarsController.deleteProduct(objID, res);
});

router.get('/latest', (req, res) => {
    var userID = req._passport['session']['user']
    Controllers.sugarsController.getUserResult(userID, res);
});

module.exports = router;
