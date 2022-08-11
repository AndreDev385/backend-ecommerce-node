const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const id = Joi.objectId();
const name = Joi.string();
const brand = Joi.objectId();
const images = Joi.array().items(Joi.objectId());
const category = Joi.string();
const description = Joi.string();
const tags = Joi.array().items(Joi.string());
const variations = Joi.array().items(Joi.objectId());

const createProductSchema = Joi.object({
  name: name.required(),
  brand: brand.required(),
  images,
  category: category.required(),
  description,
  tags,
  variations,
});

const idSchema = Joi.object({
  id: id.required(),
});

const updateProductSchema = Joi.object({
  name,
  brand,
  images,
  category,
  description,
  tags,
  variations,
});

module.exports = {
  createProductSchema,
  idSchema,
  updateProductSchema
};
