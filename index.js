require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require('morgan')

const { dbConnection } = require("./database/config");
const { config } = require("./config");
const routerApi = require("./routes");
const {
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"))

dbConnection();

routerApi(app);

app.use(boomErrorHandler);
app.use(errorHandler);

const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

module.exports = { app, server }
