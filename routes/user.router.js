const express = require('express');
const boom = require('@hapi/boom');

const userService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
//const { checkJWT } = require('../middlewares/auth.handler');
const { createUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new userService();

router.post(
  '/register',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.createUser(body);

      res.json({
        body: user,
        message: 'User created successfully',
        statusCode: 201,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
