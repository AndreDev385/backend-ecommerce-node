require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');
const { config } = require('./config');
const routerApi = require('./routes');
const { errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();

app.use(express.json());
app.use(cors());

dbConnection();

routerApi(app);

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
