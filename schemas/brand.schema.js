const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const id = Joi.objectId();
const name = Joi.string();
const description = Joi.string();
const image = Joi.string();

const createBrandSchema = Joi.object({
  name: name.required(),
  description,
  image,
});

const idSchema = Joi.object({
  id: id.required(),
});

const updateBrandSchema = Joi.object({
  name,
  description,
  image,
});

module.exports = { createBrandSchema, idSchema, updateBrandSchema };
