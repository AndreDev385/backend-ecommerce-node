const Joi = require('joi');

const name = Joi.string();
const description = Joi.string();
const image = Joi.string();

const createBrandSchema = Joi.object({
  name: name.required(),
  description: description,
  image: image,
});

module.exports = { createBrandSchema };
