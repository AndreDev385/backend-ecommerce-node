const router = require("express").Router();

const CategoryService = require("../services/category.service");
const validatorHandler = require("../middlewares/validator.handler");
const { checkJWT, isRole } = require("../middlewares/auth.handler");
const {
  createCategorySchema,
  idSchema,
  updateCategorySchema,
} = require("../schemas/category.schema");

const categoryService = new CategoryService();

router.get("/", async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories();
    res.json({ message: "success", body: categories });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryService.retrieveCategory(id);
    res.status(200).json({ message: "success", body: category });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/create",
  checkJWT,
  isRole("admin", "seller"),
  validatorHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const category = await categoryService.createCategory(body);
      res.status(201).json({
        message: "Category has been created",
        body: category,
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
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const category = categoryService.updateCategory(id, body);
      res.status(204).json({
        message: "category updated successfully",
        body: category,
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
      const category = await categoryService.deleteCategory(id);
      res.json({ message: "category deleted successfully", data: category });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
