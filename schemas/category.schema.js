const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const id = Joi.objectId();
const name = Joi.string();
const image = Joi.objectId()
const slug = Joi.string()
const title = Joi.string()
const description = Joi.string();
const tags = Joi.array().items(Joi.string())


const createCategorySchema = Joi.object({
  name: name.required(),
  image,
  slug: slug.required(),
  title,
  description,
  tags,

})

module.exports = {
  createCategorySchema
}