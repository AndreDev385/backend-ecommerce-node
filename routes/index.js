const express = require('express');

const productRouter = require('./product.router');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const brandRouter = require('./brand.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/users', userRouter);
  router.use('/products', productRouter);
  router.use('/brands', brandRouter);
}

module.exports = routerApi;
