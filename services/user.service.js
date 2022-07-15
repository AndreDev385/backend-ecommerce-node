const userModel = require('../database/models/user.model');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

class UserService {
  async isExistEmail(email) {
    const user = await userModel.findOne({ email });

    if (user) {
      throw boom.badRequest('That email is not valid');
    }
  }

  async createUser({ name, email, password, phoneNumber }) {
    await this.isExistEmail(email);

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hash,
      phoneNumber,
    });

    return user;
  }
}

module.exports = UserService;
