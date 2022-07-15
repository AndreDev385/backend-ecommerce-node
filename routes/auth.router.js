const express = require('express');
const boom = require('@hapi/boom');

const authService = require('../services/auth.service');
const validatorHandler = require('../middlewares/validator.handler');

const { loginUserSchema } = require('../schemas/auth.schema');
const { checkJWT, isRole } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new authService();

router.post(
  '/login',
  validatorHandler(loginUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const token = await service.loginUser(body);

      res.json({
        body: token,
        message: 'User login successfully',
        statusCode: 200,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/protected',
  checkJWT,
  isRole(['seller', 'admin']),
  async (req, res, next) => {
    try {
      res.json({
        message: 'You are logged in',
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/refresh-token', async (req, res, next) => {
  try {
    const refreshToken = req.headers['x-auth-token'];

    if (!refreshToken) {
      throw boom.unauthorized('No refresh token provided');
    }

    const accessToken = await service.refreshToken(refreshToken);

    res.json({
      body: accessToken,
      message: 'Access token refreshed successfully',
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
