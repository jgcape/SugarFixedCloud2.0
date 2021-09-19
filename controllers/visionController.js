let Service = require("../services");

const processLabel = async (req, res) => {
    var productName = req.productName;
    if(req.imgPath) {
        var label = await Service.visionService.extractLabel(req.imgPath);        
        if(label) {
            Service.visionService.extractSugars({label: label, productName: productName})
        }
    }
    else {
        res.json({
            statusCode: 400,
            message: "Failed: No image path"
        })
    }

}

module.exports = {
    processLabel
}