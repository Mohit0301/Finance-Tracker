const User = require("../models/user-model");
const Investment = require("../models/investment-model");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError} = require("../errors/");

async function getAllInvestments(req, res) {
    const userId = req.user.userId;

    const investments = await Investment.findAll({where: {
       userId: userId 
    }});

    res.status(StatusCodes.OK).json({success: true, investments: investments, hits: investments.length});
}

async function getInvestment(req, res) {
    const userId = req.user.userId;

    const investmentId = req.params.id;

    if(!investmentId) {
        throw new BadRequestError("Investment id is required.");
    }

    const investment = await Investment.findOne({where: {
        userId: userId,
        id: investmentId
    }});
    
    if(!investment) {
        throw new NotFoundError(`Investment with id: ${investmentId} doesn't exist`);
    }

    res.status(StatusCodes.OK).json({success: true, investment: investment, hits: investment.length});
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