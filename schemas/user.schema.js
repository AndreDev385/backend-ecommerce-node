const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId();
const email = Joi.string().email();
const password = Joi.string().min(8);
const name = Joi.string();
const phoneNumber = Joi.string()
  .length(10)
  .pattern(/^[0-9]+$/);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  name: name.required(),
  phoneNumber: phoneNumber.required(),
});

module.exports = { createUserSchema };
