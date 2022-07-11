// User Model Validations
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const id = Joi.objectId()
const email = Joi.string().email()
const password = Joi.string().min(8)

const createUserModel = Joi.object({
  email: email.required(),
  password: password.required(),
})

module.exports = {
  createUserModel,
}