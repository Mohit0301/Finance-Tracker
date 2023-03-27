const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

const errorHandlerMiddleware = require("./middleware/error-handler");

const PORT = process.env.PORT || 5000;


app.use("/api/v1", errorHandlerMiddleware);

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));