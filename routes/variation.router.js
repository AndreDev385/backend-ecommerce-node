const router = require("express").Router();

const VariationService = require("../services/productVariation.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createProductVariationSchema,
} = require("../schemas/product_variation.schema");

const variationService = new VariationService();

router.get("/", async (req, res, next) => {
  try {
    const variations = await variationService.getVariations();
    res.status(200).json({
      message: "success",
      data: variations,
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/create",
  validatorHandler(createProductVariationSchema, "body"),
  async (req, res, next) => {
    const { body } = req
    const variation = await variationService.createVariation(body);
    res.status(201).json({
      message: "success",
      data: variation,
    });
  }
);

module.exports = router;
