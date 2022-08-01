const express = require('express');

const orderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkJWT, isRole } = require('../middlewares/auth.handler');
const { createOrderSchema } = require('../schemas/order.schema');

const router = express.Router();
const service = new orderService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.getOrders();

    res.json({
      body: orders,
      message: 'Orders retrieved successfully',
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', validatorHandler(createOrderSchema, 'body'), async (req, res, next) => {
  try {
    const { products } = req.body;
    console.log(products);

    const order = await service.createOrder(products);

    return res.status(201).json({
      message: 'ok',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
