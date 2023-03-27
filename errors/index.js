/*  This file is just for the sake of convenience. 
    Instead of having to import every error class separately, all the error classes 
    can be imported from this single file.
*/

const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
const UnauthorizedError = require("./unauthorized");


module.exports = {NotFoundError, BadRequestError, UnauthorizedError};