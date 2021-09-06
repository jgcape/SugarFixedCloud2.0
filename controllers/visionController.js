let Service = require("../services");

const processLabel = (req, res) => {
    Service.visionService.getAllIngredients(req)
}

module.exports = {
    processLabel
}