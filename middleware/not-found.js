const {StatusCodes} = require("http-status-codes");

function notFound(req, res, next) {
    res.status(StatusCodes.NOT_FOUND).json({success: false, message: "Route not found."});
}

module.exports = notFound;