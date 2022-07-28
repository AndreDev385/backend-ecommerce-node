const router = require("express").Router();

const ProductService = require("../services/product.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createProductSchema } = require("../schemas/product.schema");

const productService = new ProductService();

router.get("/", async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json({ message: "success", body: products });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.status(200).json({ message: "success" });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/create",
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newProduct = await productService.createProduct(body);
      res.status(201).json({
        message: "Product has been created",
        body: [newProduct],
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id", async (req, res, next) => {
  try {
    res.json({ message: "updated" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    res.json({ message: "deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
