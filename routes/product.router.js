const router = require("express").Router();
const boom = require('@hapi/boom')

const ProductService = require("../services/product.service");
const validatorHandler = require("../middlewares/validator.handler");
const { checkJWT, isRole } = require("../middlewares/auth.handler");
const {
  createProductSchema,
  idSchema,
  updateProductSchema,
} = require("../schemas/product.schema");

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
    const { id } = req.params;
    const product = await productService.retrieveProduct(id);
    res.status(200).json({ message: "success", body: product });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  checkJWT,
  isRole("admin", "seller"),
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newProduct = await productService.createProduct(body);
      res.status(201).json({
        message: "Product has been created",
        body: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  checkJWT,
  isRole("admin", "seller"),
  validatorHandler(idSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedProduct = await productService.updateProduct(id, body);
      console.log(updatedProduct);
      res.json({ message: "updated", body: updatedProduct });
    } catch (error) {
      next(error);
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
      const deletedProduct = await productService.deleteProduct(id);
      res.status(204).json({
        message: "succesfully deleted",
        data: deletedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
