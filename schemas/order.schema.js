const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const id = Joi.objectId();
const products = Joi.array().items(Joi.objectId());

const createOrderSchema = Joi.object({
	products: products.required(),
});

module.exports = { createOrderSchema };
