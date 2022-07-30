const express = require("express");

const brandService = require("../services/brand.service");
const validatorHandler = require("../middlewares/validator.handler");
const { checkJWT, isRole } = require("../middlewares/auth.handler");
const {
  createBrandSchema,
  idSchema,
  updateBrandSchema,
} = require("../schemas/brand.schema");

const router = express.Router();
const service = new brandService();

router.get("/", async (req, res, next) => {
  try {
    const brands = await service.getBrands();

    res.json({
      body: brands,
      message: "Brands retrieved successfully",
      statusCode: 200,
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  checkJWT,
  isRole("admin", "seller"),
  validatorHandler(createBrandSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const brand = await service.createBrand(body);

      res.status(201).json({
        body: brand,
        message: "Brand created successfully",
        statusCode: 201,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await service.retrieveBrand(id);
    res.status(200).json({ message: "success", body: brand });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  checkJWT,
  isRole("admin", "seller"),
  validatorHandler(idSchema, "params"),
  validatorHandler(updateBrandSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const brand = service.updateBrand(id, body);
      res.status(204).json({
        message: "brand updated successfully",
        body: brand,
      });
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
      const brand = await service.deleteBrand(id);
      res.json({ message: "brand deleted successfully", data: brand });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
