const router = require("express").Router();

const ProductService = require("../services/product.service");
const VariationService = require("../services/productVariation.service");
const AssetService = require("../services/asset.service");
const validatorHandler = require("../middlewares/validator.handler");
const { checkJWT, isRole } = require("../middlewares/auth.handler");
const {
  createProductSchema,
  idSchema,
  updateProductSchema,
} = require("../schemas/product.schema");

const productService = new ProductService();
const variationService = new VariationService();
const assetService = new AssetService();

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

router.post("/dashboard", async (req, res, next) => {
  try {
    const variationsIds = [];

    const { body } = req;
    const product = await productService.createProduct({
      name: body.name,
      brand: body.brand,
      category: body.category,
      images: body.images,
      description: body.description ? body.description : "",
      tags: body.tags ? body.tags : [],
    });

    for (const variation of body.variations) {
      const { offerPrice, ...body } = variation;
      const newVariation = await variationService.createVariation({
        product: product._id,
        offerPrice: offerPrice === 0 ? null : offerPrice,
        ...body,
      });

      variationsIds.push(newVariation._id);
    }

    await productService.addVariations(product._id, variationsIds);

    const result = await productService.retrieveProduct(product.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

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
      const deletedProduct = await productService.desactiveProduct(id);
      res.status(204).json({
        message: "succesfully deleted",
        data: deletedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id/dashboard", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.findOne(id);
    console.log(product)
    for (const variation of product.variations) {
      console.log("variation id", variation)
      await variationService.deleteVariation(variation);
    }
    await productService.deleteProduct(id);
    res.json({ message: "product deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
