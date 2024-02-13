const router = require('express').Router()
const imageRouter = require('./imageRouter')
const userRouter = require('./userRouter')

router.use(userRouter)
router.use(imageRouter)

router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router