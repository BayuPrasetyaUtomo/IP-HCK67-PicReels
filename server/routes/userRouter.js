const userRouter = require('express').Router()
const { registerUser, userLogin, googleOAuthLogin, leave } = require('../controllers/userController')
const authentication = require('../middlewares/authentication')


userRouter.post("/register",registerUser)
userRouter.post("/login", userLogin)
userRouter.post("/google-login", googleOAuthLogin)
// userRouter.post("/leave", authentication, leave)

module.exports = userRouter