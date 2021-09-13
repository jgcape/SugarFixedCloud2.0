const vision = require('@google-cloud/vision');
// const { GOOGLE_APPLICATION_CREDENTIALS } = require('../gcpConnect')

const extractLabel = async (req, res) => {
    let img_path = req
    if(req) {
        // Create a client
        const client = new vision.ImageAnnotatorClient(credentials=process.env.GOOGLE_APPLICATION_CREDENTIALS);
        console.log("Client created")
        // Performs text detection on the local file
        const [result] = await client.textDetection(img_path);
        const detections = result.textAnnotations;
        let label = detections.shift().description;
        // detections.forEach(item => console.log(item.description));
        if(label) {
            return label
        }
        else {
            res.json({
                statusCode: 400,
                data: req,
                message: "Failed: Label OCR"
            })
        };
    }
    else {
        res.json({
            statusCode: 400,
            data: req,
            message: "Failed: No label to process"
        })
    };
}

const extractSugars = (req, res) => {
    console.log("Extracting sugars")
    let label = req.replaceAll("\n", " "); //replace new line char with space
    let ingredients = label.split(/[,,.,:,/]/);
    console.log(label);
    // console.log(ingredients);
    let i = 0
    ingredients.forEach((item) => {
        console.log(i,item)
        i++
    })
}

module.exports = {
    extractLabel, extractSugars
}