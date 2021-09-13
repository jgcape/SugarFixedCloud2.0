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
        console.log('Text:');
        let label = detections.shift().description;
        // detections.forEach(item => console.log(item.description));
        console.log(label);
        // console.log(detections[0])
        
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

module.exports = {
    extractLabel
}