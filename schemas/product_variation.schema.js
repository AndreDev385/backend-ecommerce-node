const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const id = Joi.objectId();
const product = Joi.objectId();
const images = Joi.array(Joi.string());
const attributes = Joi.array(
  Joi.object({ name: Joi.string().required(), value: Joi.string().required() })
);
const normalPrice = Joi.number()
const offerPrice = Joi.number()
const stock = Joi.number()


const createProductVariationSchema = Joi.object({
  product: product.required(),
  images,
  attributes,
  normalPrice,
  offerPrice,
  stock,
})

module.exports = {
  createProductVariationSchema
}