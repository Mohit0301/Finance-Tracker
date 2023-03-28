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
    const userId = req.user.userId;

    const {category, institute, amount, investmentDate} = req.body;

    if(!category || !institute || !amount) {
        throw new BadRequestError("Category, institute, and amount must be provided");
    }

    //values to be inserted in the Investments table
    const values = {
        userId: userId,
        category: category,
        institute: institute,
        amount: amount
    }

    if(investmentDate) {
        values.investmentDate = investmentDate;
    }

    const investment = await Investment.create(values);

    res.status(StatusCodes.CREATED).json({success: true, investment});
}

async function updateInvestment(req, res) {
    const userId = req.user.userId;
    const investmentId = req.params.id;

    const {amount, investmentDate} = req.body;

    const values = {};

    if(amount) {
        values.amount = amount
    }
    if(investmentDate) {
        values.investmentDate = investmentDate
    }

    const updatedInvestment = await Investment.update(values, {
        where: {
            userId: userId,
            id: investmentId
        },
    });

    res.status(StatusCodes.OK).json({hits: updatedInvestment[0]});
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