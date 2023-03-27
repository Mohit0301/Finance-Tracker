const {BadRequestError} = require("../errors/");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user-model");
const {StatusCodes} = require("http-status-codes");

async function login(req, res) {
    res.send("TODO");
}

async function register(req, res) {
    
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName || !email || !password) {
        throw new BadRequestError("First Name, Last Name, Email, and Password required.");
    }

    const newUser = await createUserObject(firstName, lastName, email, password);

    const user = await UserModel.create(newUser);

    res.status(StatusCodes.CREATED).json({success: true, user});
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