const vision = require('@google-cloud/vision');

// Load Sugar model
const Sugar = require('../models/Sugars');

const SUGARS_DB = ['sugar','dextrose','fructose','galactose','glucose','lactose','maltose',
                'sucrose','demerara','syrup','rapadura','dextrin','diastatic malt','maltol',
                'muscovado','panela','maltodextrin','turbinado','sucanat','molasses','agave',
                'high fructose','hfcs','honey','treacle','buttercream','caramel'];

function filterSugars(arr, query) {
    return arr.filter(function(el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
};

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
};

const extractLabel = async (req, res) => {
    let img_path = req
    if(img_path) {
        // Create a client
        const client = new vision.ImageAnnotatorClient(credentials=process.env.GOOGLE_APPLICATION_CREDENTIALS);
        console.log("Client created")
        // Performs text detection on the local file
        const [result] = await client.textDetection(img_path);
        const detections = result.textAnnotations;
        if (detections.length != 0){
            let label = detections.shift().description;
            if(label) {
                return label
            }
        }
    }
    return null
};

const extractSugars = (req, res) => {
    if(req.label) {
        var sugarsData = {
            productName: req.productName,
            userID: req.userID
        }
        console.log("Extracting sugars")
        let label = req.label.replaceAll("\n", " "); // replace new line char with space
        let ingredients = label.split(/[,,.,:,(,),[,\]]/); // split label string to list of words
        var allSugars = new Set();
        SUGARS_DB.forEach((sugar) => {
            let filtered = filterSugars(ingredients, sugar);
            let matched = new Set(filtered);
            allSugars = union(allSugars, matched);
        });
        let sugarsList = Array.from(allSugars);
        if (sugarsList.length != 0) {
            sugarsData['sugars'] = sugarsList;
            // saveSugars(sugarsList, productName)
        }
        else {
            sugarsData['sugars'] = ["No sugars detected"];
            // saveSugars(["No sugars found"], productName)
        }

        saveSugars(sugarsData)

    }
    else {
        res.json({
            statusCode: 400,
            message: "Failed: Cannot extract sugars from label"
        });
    };
};

const saveSugars = (sugarsData) => {
    Sugar.create(sugarsData, (err, result) => {
        if(result) {
            console.log("Sugars saved", result);
        }
    });
}

module.exports = {
    extractLabel, extractSugars
}