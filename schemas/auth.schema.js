const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(8);
const token = Joi.string();

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const recoverySchema = Joi.object({
  email: email.required(),
});

const changePasswordSchema = Joi.object({
  token: token.required(),
  password: password.required(),
});

module.exports = { loginUserSchema, recoverySchema, changePasswordSchema };
