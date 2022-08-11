const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const id = Joi.objectId();
const name = Joi.string();
const image = Joi.objectId();
const description = Joi.string();
const tags = Joi.array().items(Joi.string());
const ancestors = Joi.array().items(Joi.string())

const createCategorySchema = Joi.object({
  _id: Joi.string().required(),
  name: name.required(),
  image,
  description,
  tags,
  ancestors: ancestors.required()
});

const idSchema = Joi.object({
  id: id.required(),
});

const updateCategorySchema = Joi.object({
  name,
  image,
  description,
  tags,
  ancestors
});

module.exports = {
  createCategorySchema,
  idSchema,
  updateCategorySchema,
};
