const express = require('express');

const userService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkJWT, isRole } = require('../middlewares/auth.handler');
const {
  createUserSchema,
  idSchema,
  updateUserRoleSchema,
} = require('../schemas/user.schema');

const router = express.Router();
const service = new userService();

router.get('/', checkJWT, isRole('admin'), async (req, res, next) => {
  try {
    const users = await service.getUsers();

    res.json({
      body: users,
      message: 'Users retrieved successfully',
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/register',
  checkJWT,
  isRole('admin'),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.createUser(body);

      res.status(201).json({
        body: user,
        message: 'User created successfully',
        statusCode: 201,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:id/role',
  checkJWT,
  isRole('admin'),
  validatorHandler(idSchema, 'params'),
  validatorHandler(updateUserRoleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const user = await service.updateUserRole(id, role);

      res.json({
        body: user,
        message: 'User role updated successfully',
        statusCode: 200,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:id/delete',
  checkJWT,
  isRole('admin'),
  validatorHandler(idSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await service.deleteUser(id);

      res.json({
        body: user,
        message: 'User deleted successfully',
        statusCode: 200,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
