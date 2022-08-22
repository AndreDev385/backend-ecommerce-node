const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId();
const owner = Joi.objectId();
const original = Joi.string();
/*const sizes = Joi.array(
  Joi.object({
    size: Joi.string().required(),
    url: Joi.string().required(),
  })
);*/

const indexOrder = Joi.number();

const createAssetSchema = Joi.object({
  owner,
  original,
  /*sizes,*/
  indexOrder,
});

const idAssetSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createAssetSchema,
  idAssetSchema,
};
