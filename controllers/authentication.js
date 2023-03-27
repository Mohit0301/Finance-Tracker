const {BadRequestError, NotFoundError, UnauthorizedError} = require("../errors/");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user-model");
const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");


async function login(req, res) {
    const {email, password} = req.body;

    if(!email || !password) {
        throw new BadRequestError("Email, and password are required");
    }

    const user = await UserModel.findOne({where: {
        email: email
    }});
    
    if(!user) {
        throw new UnauthorizedError("Incorrect email or password");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if(passwordIsCorrect) {
        const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME
        });
        return res.status(StatusCodes.OK).json({success: true, token: token});
    } else {
        throw new UnauthorizedError("Incorrect email or password");
    }
}

async function register(req, res) {
    
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName || !email || !password) {
        throw new BadRequestError("First Name, Last Name, Email, and Password required.");
    }

    const newUser = await createUserObject(firstName, lastName, email, password);

    const user = await UserModel.create(newUser);

    res.status(StatusCodes.CREATED).json({success: true});
}

async function createUserObject(firstName, lastName, email, password) {
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(password, salt);

    newUser.password = hashedPassowrd;

    return newUser;
}

module.exports = {login, register};