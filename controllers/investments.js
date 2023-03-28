const User = require("../models/user-model");
const Investment = require("../models/investment-model");
const {StatusCodes} = require("http-status-codes");

async function getAllInvestments(req, res) {
    const userId = req.user.userId;

    const investments = await Investment.findAll({where: {
       userId: userId 
    }});

    res.status(StatusCodes.OK).json({success: true, investments: investments, hits: investments.length});
}

async function getInvestment(req, res) {
    res.send("TODO: getInvestment");
}

async function createInvestment(req, res) {
    res.send("TODO: createInvestment");
}

async function updateInvestment(req, res) {
    res.send("TODO: updateInvestment");
}

async function deleteInvestment(req, res) {
    res.send("TODO: deleteInvestment");
}

module.exports = {
    getAllInvestments, 
    getInvestment,
    createInvestment,
    updateInvestment,
    deleteInvestment
};