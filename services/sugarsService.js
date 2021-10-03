const Sugar = require('../models/Sugars');

const getAllSugars = async (req, res) => {
    let userID = req;
    let sugars = await Sugar.find({userID: userID}).sort({date: -1}).exec();
    return sugars
};

const getLatestSugar = async (req, res) => {
    let userID = req;
    let sugars = await Sugar.findOne({userID: userID}).sort({date: -1}).exec();
    return sugars
};

const updateProductName = async (req, res) => {
    let objID = req.objID;
    let newName = req.name;
    let updated = await Sugar.updateOne({_id: objID},{productName:newName}).exec();
    console.log(updated)
    return update
};

const deleteByID = async (req, res) => {
    let objID = req;
    let deleted = await Sugar.deleteOne({_id: objID}).exec();
    console.log(deleted)
    return deleted
};

module.exports = {
    getAllSugars, getLatestSugar, updateProductName, deleteByID
}