const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const id = Joi.objectId();
const name = Joi.string();
const description = Joi.string();
const brand = Joi.string();
const categories = Joi.array().items(Joi.object({ name: Joi.string() }));
const specificProducts = Joi.array().items(
  Joi.object({
    attrs: Joi.array()
      .items(
        Joi.object({
          name: Joi.string(),
          value: Joi.string(),
        })
      )
      .required(),
    assets: Joi.object({
      defaultImg: Joi.object({
        src: Joi.string(),
      }).required(),
      imgs: Joi.array().items(
        Joi.object({
          src: Joi.string(),
        })
      ),
    }).required(),
    stock: Joi.number().required(),
    price: Joi.object({
      sellPrice: Joi.number().required(),
      regularPrice: Joi.number(),
      discountPrice: Joi.number(),
    }),
  })
);

const createProductSchema = Joi.object({
  name: name.required(),
  description,
  brand: brand.required(),
  categories: categories,
  specificProducts: specificProducts.required(),
});

module.exports = {
  createProductSchema,
};
