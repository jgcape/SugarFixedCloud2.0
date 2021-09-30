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

module.exports = {
    getAllSugars, getLatestSugar
}