let Service = require("../services");

const processLabel = async (req, res) => {
    var label = await Service.visionService.extractLabel(req);
    if(label) {
        Service.visionService.extractSugars(label)
        // console.log(label)
        // res.json({
        //     statusCode: 200,
        //     data: label,
        //     message: "Success: extracted label"
        // })
    }
}

module.exports = {
    processLabel
}