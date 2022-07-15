const config = {
  env: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGO,
  port: process.env.PORT || '4000',
  SECRET_KEY: process.env.SECRET_KEY,
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
};

module.exports = { config };
