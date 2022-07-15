const boom = require('@hapi/boom');
const { config } = require('../config');
const jwt = require('jsonwebtoken');

function checkJWT(req, res, next) {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return next(boom.unauthorized('No token provided'));
  }

  try {
    const payload = jwt.verify(token, config.SECRET_KEY);

    req.user = payload;

    next();
  } catch (err) {
    next(boom.unauthorized());
  }
}

function isRole(role = []) {
  return (req, res, next) => {
    if (role.includes(req.user.role)) {
      next();
    } else {
      next(boom.unauthorized('You are not authorized to access this resource'));
    }

    next();
  };
}

module.exports = { checkJWT, isRole };
