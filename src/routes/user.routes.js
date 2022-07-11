const router = require("express").Router();

const validatorHandler = require('../middlewares/validator.handler')
const {createUserModel} = require('../models/userModel')
const { listUsersUsecase, createUserUsecase } = require("../usecases/users");

router.get("/", async (req, res, next) => {
  try {
    const ACEPTED_QUERIES = ["email__eq", "email__in"];
    const query = req.query;
    
    for (let key of Object.keys(query)) {
      if (!ACEPTED_QUERIES.includes(key)) {
        return res.json({
          message: "there was an error",
          error: `filters: ${key} is an invalid filter`,
        });
      }
    }

    const users = await listUsersUsecase(query);

    res.json({ message: "success", data: users});

  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json({ message: "success" });
  } catch (error) {
    next(error);
  }
});

router.post("/create", validatorHandler(createUserModel, 'body'),async (req, res, next) => {
  try {
    const { body } = req
    const user = await createUserUsecase(body)

    res.json({ message: "created", data: user}).status(201)
  } catch (error) {
    next(error)
  }
});

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
