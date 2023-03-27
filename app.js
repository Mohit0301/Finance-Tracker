const express = require("express");
const app = express();
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect-db");
const notFoundMiddleware = require("./middleware/not-found");
const authenticationRouter = require("./routers/authentication");
require("dotenv").config();
require("express-async-errors");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1/authentication", authenticationRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

async function start() {
    try {
        const result = await connectDB.connectDB();
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
        console.log(result);
    } catch(error) {
        console.log(error);
    }
}

start();