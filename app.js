const express = require("express");
const app = express();
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect-db");
require("dotenv").config();
require("express-async-errors");

const PORT = process.env.PORT || 5000;

app.use("/api/v1", errorHandlerMiddleware);

async function start() {
    try {
        const result = await connectDB.connectDB();
        console.log(result);
    } catch(error) {
        console.log(error);
    }
}

start();