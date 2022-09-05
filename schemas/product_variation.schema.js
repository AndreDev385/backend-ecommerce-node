const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const id = Joi.objectId();
const product = Joi.objectId();
const images = Joi.array().items(Joi.string());
const attributes = Joi.array().items(
  Joi.object({
    type: Joi.string().required(),
    label: Joi.string().required(),
    value: Joi.string().required(),
  })
);
const normalPrice = Joi.number();
const offerPrice = Joi.number();
const stock = Joi.number();

const createProductVariationSchema = Joi.object({
  product: product.required(),
  images,
  attributes,
  normalPrice,
  offerPrice,
  stock,
});

const idSchema = Joi.object({
  id: id.required(),
});

const updateProductVariationSchema = Joi.object({
  images,
  attributes,
  normalPrice,
  offerPrice,
  stock,
});

module.exports = {
  createProductVariationSchema,
  idSchema,
  updateProductVariationSchema,
};
