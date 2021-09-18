const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const SugarSchema = new mongoose.Schema({
    userID: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    productName: {
        type: String,
        required: true
    },
    productSugars: {
        type: Array,
        required: true
    }
});

const Sugar = mongoose.model('Sugar', SugarSchema);

module.exports = Sugar;