let Service = require("../services");
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const processLabel = async (req, res) => {
    var productName = req.productName;
    if(req.imgPath) {
        var imgPath = req.imgPath;
        var label = await Service.visionService.extractLabel(imgPath);        
        if(label) {
            Service.visionService.extractSugars({label: label, productName: productName})
        }
        // Tidy uploads, remove image from temp server storage 
        await unlinkFile(imgPath)
        console.log("Image removed from server")
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