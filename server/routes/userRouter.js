const userRouter = require('express').Router()
const { registerUser, userLogin } = require('../controllers/userController')


userRouter.post("/register",registerUser)
userRouter.post("/login", userLogin)

module.exports = userRouter