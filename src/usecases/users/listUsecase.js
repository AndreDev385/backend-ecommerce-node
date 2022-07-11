const User = require('../../database/models/user')

async function listUsersUsecase(filters = null){
  let users = await User.find()
  if(filters){
    if('email__eq' in filters){
      users = users.filter(u => u.email === filters.email__eq)
    }
    if('email__in' in filters){
      users = users.filter(u => u.email.includes(filters.email__in))
    }
  }
  console.log(users)
  return users
}

module.exports = listUsersUsecase