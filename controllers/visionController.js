let Service = require("../services");

const processLabel = (req, res) => {
    Service.visionService.processLabel(req);
}

module.exports = {
    processLabel
}