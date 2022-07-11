const config = {
  env: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGO,
  port: process.env.PORT || '4000'
}

module.exports = { config }