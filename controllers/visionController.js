let Service = require("../services");

const processLabel = async (req, res) => {
    var label = await Service.visionService.extractLabel(req);
    if(label) {
        Service.visionService.extractSugars(label)
    }
}

module.exports = {
    processLabel
}