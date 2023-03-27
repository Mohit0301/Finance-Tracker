const jwt = require("jsonwebtoken");
const {UnauthorizedError} = require("../errors/");

function authorize(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Unauthorized to access this route.");
    }

    //Check the format of a Bearer token.
    const token = authorizationHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: payload.userId, email: payload.email};
        next();
    } catch(error) {
        throw new UnauthenticatedError("Authorization Invalid");
    }
}

module.exports = authorize;