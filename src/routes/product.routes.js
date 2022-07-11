const router = require('express').Router()

router.get('/', async(req, res, next) => {
  try {
    res.json({'message': 'succes'}) 
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async(req, res, next) => {
  try {
    res.json({'message': 'success'}) 
  } catch (error) {
    next(error)
  }
})

router.post('/create', async (req, res, next) => {
  try {
    res.json({'message': 'created'}) 
  } catch (error) {
    next(error) 
  }
})


router.put('/:id', async (req, res, next) => {
  try {
    res.json({'message': 'updated'}) 
  } catch (error) {
    next(error) 
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    res.json({'message': 'deleted'}) 
  } catch (error) {
    next(error) 
  }
})

module.exports = router