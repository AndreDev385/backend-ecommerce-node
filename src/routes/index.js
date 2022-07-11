const router = require('express').Router()

const productRouter = require('./product.routes')
const userRouter = require('./user.routes')

function routerAPI(app){
  app.use('/api/v1', router)
  router.use('/products', productRouter)
  router.use('/users', userRouter)
}

module.exports = routerAPI