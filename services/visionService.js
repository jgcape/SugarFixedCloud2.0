
const getAllIngredients = async (req, res) => {
    if(req) {
        // Send to google vision API
        // TODO
        // If ingredients returned
        if(result) {
             return result
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
    getAllIngredients
}