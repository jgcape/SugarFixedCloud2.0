let Service = require("../services");

const processLabel = (req, res) => {
    Service.visionService.extractLabel(req);
}

module.exports = {
    processLabel
}