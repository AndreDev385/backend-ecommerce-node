const userModel = require('../database/models/user.model');
const tokenModel = require('../database/models/token.model');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
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

    if (!user.isActive) {
      throw boom.unauthorized();
    }

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
      user: {
        name: user.name,
        email: user.email,
      },
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

  generateAndSignRecoveryToken(user) {
    const payload = {
      uid: user.id,
      role: user.role,
    };

    const recoveryToken = jwt.sign(payload, config.RECOVERY_SECRET_KEY, {
      expiresIn: config.JWT_RECOVERY_EXPIRATION,
    });

    return recoveryToken;
  }

  async sendMail(mail) {
    try {
      const transporter = nodeMailer.createTransport({
        host: config.EMAIL_HOST,
        secure: true,
        port: config.EMAIL_PORT,
        auth: {
          user: config.EMAIL,
          pass: config.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail(mail);
      return { message: 'Email sent successfully' };
    } catch (err) {
      throw boom.badImplementation('Error sending email');
    }
  }

  async recovery(email) {
    const user = await this.isExistUser(email);

    const recoveryToken = this.generateAndSignRecoveryToken(user);
    const link = `${config.FRONTEND_URL}/recovery?token=${recoveryToken}`;

    user.recoveryToken = recoveryToken;
    await user.save();

    const mail = {
      from: config.EMAIL,
      to: user.email,
      subject: 'Recovery password',
      text: `Please click on the link to recover your password: ${link}`,
    };

    const { message } = await this.sendMail(mail);
    return message;
  }

  async changePassword(token, password) {
    try {
      const payload = jwt.verify(token, config.RECOVERY_SECRET_KEY);
      const user = await userModel.findById(payload.uid);

      if (!user.isActive) {
        throw boom.unauthorized();
      }

      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.recoveryToken = null;

      await user.save();

      return { message: 'Password changed successfully' };
    } catch (err) {
      throw boom.unauthorized();
    }
  }
}

module.exports = UserService;
