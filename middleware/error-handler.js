const {BadRequestError, UnauthorizedError, NotFoundError} = require("../errors/");
const {StatusCodes} = require("http-status-codes");

function errorHandler(error, req, res, next) {
    const response = {
        success: false,
        message: error.message
    };
    if(error instanceof BadRequestError || error instanceof UnauthorizedError || error instanceof NotFoundError) {
        return res.status(error.statusCode).json(response);
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: "Something went wrong."});
}

module.exports = errorHandler;