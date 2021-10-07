let Service = require("../services");
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const processLabel = async (req, res) => {
    if (req.imgPath) {
        var imgPath = req.imgPath;
        var labelData = {
            productName: req.productName,
            userID: req.userID
        };
        var label = await Service.visionService.extractLabel(imgPath);
        if(label) {
            labelData['label'] = label;
            Service.visionService.extractSugars(labelData);
            res.json({
                statusCode: 200,
                message: "Success: Sugars saved"
            })
        }
        else {
            res.json({
                statusCode: 400,
                message: "Failed: OCR unable to detect text"
            });
        };
    }
    else{
        res.json({
            statusCode: 400,
            message: "Failed: No image provided"
        });
    }

    // Tidy uploads, remove image from temp server storage
    if (imgPath != process.env.TEST_IMG) {
        await unlinkFile(imgPath)
        console.log("Image removed from server")
    } 

}

module.exports = {
    processLabel
}