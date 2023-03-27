
function errorHandler(error, req, res, next) {
    const response = {
        success: false,
        message: error.message
    };
    res.status(error.statusCode).json(response);
}

module.exports = errorHandler;