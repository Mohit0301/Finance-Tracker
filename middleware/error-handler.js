const {BadRequestError, UnauthorizedError, NotFoundError} = require("../errors/");
const {StatusCodes} = require("http-status-codes");
const { ValidationError } = require("sequelize");

function errorHandler(error, req, res, next) {
    const response = {
        success: false,
        message: error.message || "Something went wrong"
    };
    if(error instanceof BadRequestError || error instanceof UnauthorizedError || error instanceof NotFoundError) {
        return res.status(error.statusCode).json(response);
    } else if(error instanceof ValidationError) {
        response.message = error.message;
        return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
}

module.exports = errorHandler;