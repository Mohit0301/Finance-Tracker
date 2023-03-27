const {Sequelize} = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    host: "localhost",
    database: process.env.DATABASE,
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    dialect: "mysql"
});

async function connectDB() {
    return new Promise(async (resolve, reject) => {
        try {
            await sequelize.authenticate();
            resolve("Connected to the database");
        } catch(error) {
            reject(error);
        }
    });
}

module.exports = {sequelize, connectDB};