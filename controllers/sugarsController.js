let Service = require("../services");

const getUserSugars = async (req, res) => {
    if (req) {
        let result = await Service.sugarsService.getAllSugars(req);
        if(result) {
            res.json({
                statusCode:200,
                data: result,
                message: "Sucess: retrieved all results for user"
            });
        }
        else {
            res.json({
                statusCode:400,
                message: "Failed: could not retrieve results for user"
            });
        }
    }
    else {
        res.json({
            statusCode: 400,
            message: "Failed: No userID"
        });
    }

};

const getUserResult = async (req, res) => {
    if (req) {
        let result = await Service.sugarsService.getLatestSugar(req);
        if(result) {
            res.json({
                statusCode:200,
                data: result,
                message: "Sucess: retrieved latest sugar for user"
            });
        }
        else {
            res.json({
                statusCode:400,
                message: "Failed: could not retrieve result for user"
            });
        }
    }
    else {
        res.json({
            statusCode: 400,
            message: "Failed: No userID"
        });
    }

};

module.exports = {
    getUserSugars, getUserResult
}