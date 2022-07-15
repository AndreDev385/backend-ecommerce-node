const User = require('../../database/models/user')
const boom = require('@hapi/boom')

async function createUserUsecase(user){
  const userAlreadyExists = await User.findOne({email: user.email})
  if (userAlreadyExists){
    throw boom.badRequest('Email is already in use')
  }

  const newUser = new User(user)
  newUser.save()
  
  return newUser
}

module.exports = createUserUsecase