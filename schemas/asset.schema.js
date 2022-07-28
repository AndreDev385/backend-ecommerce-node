const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const id = Joi.objectId()
const owner = Joi.objecId()
const original = Joi.string()
const sizes = Joi.array(Joi.object({
  size: Joi.string().required(),
  url: Joi.string().required()
}))
const indexOrder = Joi.number()

const createAssetSchema = Joi.object({
  owner,
  original,
  sizes,
  indexOrder
})

module.exports = {
  createAssetSchema
}