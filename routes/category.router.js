const router = require("express").Router();

const CategoryService = require("../services/category.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createCategorySchema } = require("../schemas/category.schema");

const categoryService = new CategoryService();

router.get("/", async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories();
    console.log(categories)
    res.json({ message: "success", body: categories });
  } catch (error) {
    console.log(error)
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
  validatorHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const category = await categoryService.createCategory(body);
      res.status(201).json({
        message: "Category has been created",
        body: [category],
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
