require("dotenv").config();
const express = require("express");
const cors = require("cors");

const morgan = require("morgan"); // Dev

const { dbConnection } = require("./database/config");
const { config } = require("./config");
const routerAPI = require('./routes')

const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("dev")); // Dev

dbConnection();

routerAPI(app)

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
