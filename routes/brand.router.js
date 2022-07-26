const express = require('express');

const brandService = require('../services/brand.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkJWT, isRole } = require('../middlewares/auth.handler');
const { createBrandSchema } = require('../schemas/brand.schema');

const router = express.Router();
const service = new brandService();

router.get('/', async (req, res, next) => {
  try {
    const brands = await service.getBrands();

    res.json({
      body: brands,
      message: 'Brands retrieved successfully',
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  checkJWT,
  isRole('admin', 'seller'),
  validatorHandler(createBrandSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const brand = await service.createBrand(body);

      res.status(201).json({
        body: brand,
        message: 'Brand created successfully',
        statusCode: 201,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
