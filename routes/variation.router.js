
const router = require("express").Router();
const boom = require('@hapi/boom')

const VariationService = require("../services/productVariation.service");
const validatorHandler = require("../middlewares/validator.handler");
const { checkJWT, isRole } = require("../middlewares/auth.handler");
const {
  createProductVariationSchema,
  idSchema,
  updateProductVariationSchema,
} = require("../schemas/product_variation.schema");


const variationService = new VariationService();

router.get('/', async (req, res, next) => {
  try {
    const variations = await variationService.getVariations();
    res.status(200).json({
      message: 'success',
      data: variations,
    });
  } catch (err) {
    next(err);
  }
});

router.post(

  "/",
  checkJWT,
  isRole("admin", "seller"),
  validatorHandler(createProductVariationSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const variation = await variationService.createVariation(body);
      res.status(201).json({
        message: "success",
        data: variation,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const variation = await variationService.retrieveVariation(id);
    if(variation.length < 1) boom.badRequest('Not found')
    res.status(200).json({
      message: "success",
      data: variation,
    });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  checkJWT,
  isRole("admin", "seller"),
  validatorHandler(idSchema, "params"),
  validatorHandler(updateProductVariationSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const variation = await variationService.updateVariation(id, body);
      res.status(200).json({
        message: "success",
        data: variation,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  checkJWT,
  isRole("admin", "seller"),
  validatorHandler(idSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const variation = await variationService.deleteVariation(id);
      res.status(204).json({
        message: "success",
        data: variation,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
