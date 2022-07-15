const userModel = require('../database/models/user.model');
const tokenModel = require('../database/models/token.model');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

class UserService {
  async isExistUser(email) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw boom.badRequest('That email is not valid');
    }

    return user;
  }

  async isValidPassword(password, userPassword) {
    const validPassword = await bcrypt.compare(password, userPassword);

    if (!validPassword) {
      throw boom.badRequest('');
    }
  }

  async isValidRefreshToken(token) {
    const refreshToken = await tokenModel.findOne({ token });

    if (!refreshToken || !refreshToken.isValid) {
      throw boom.unauthorized('Invalid refresh token');
    }
  }

  async loginUser({ email, password }) {
    const user = await this.isExistUser(email);
    await this.isValidPassword(password, user.password);

    const token = this.generateAndSignAccessToken(user);
    const refreshToken = this.generateAndSignRefreshToken(user);

    const existToken = await tokenModel.findOne({ userId: user.id });

    if (existToken) {
      existToken.token = refreshToken;
      await existToken.save();
    } else {
      await tokenModel.create({
        token: refreshToken,
        userId: user.id,
        email: user.email,
      });
    }

    return {
      token,
      refreshToken,
    };
  }

  async refreshToken(token) {
    await this.isValidRefreshToken(token);

    const user = jwt.verify(token, config.REFRESH_SECRET_KEY);
    const accessToken = this.generateAndSignAccessToken(user);

    return accessToken;
  }

  generateAndSignAccessToken(user) {
    const payload = {
      uid: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, config.SECRET_KEY, {
      expiresIn: config.JWT_EXPIRATION,
    });

    return token;
  }

  generateAndSignRefreshToken(user) {
    const payload = {
      uid: user.id,
      role: user.role,
    };

    const refreshToken = jwt.sign(payload, config.REFRESH_SECRET_KEY, {
      expiresIn: config.JWT_REFRESH_EXPIRATION,
    });

    return refreshToken;
  }
}

module.exports = UserService;
