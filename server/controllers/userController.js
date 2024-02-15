const { User } = require("../models")
const { signToken, verifyToken } = require("../helpers/jwt")
const { comparePassword } = require("../helpers/bcrypt")

module.exports = class UserController {

  // Create User data using POST method and automatically assign their role to be 'Staff' and limit it to user who has 'Admin' role
  static async registerUser(req, res, next) {
    try {

      const { username, email, password } = req.body

      // let user = { username, email, password }
      let user = await User.create({ username, email, password })

      res.status(201).json({ message: `Congratulations ${user.username} you have joined Pic Reels community` })
      // res.status(201).json({ message: `Congratulations ${username} you have joined Pic Reels community` })
    } catch (error) {
      next(error)
    }
  }

  // Create User data using POST method and automatically assign their role to be 'Staff' and limit it to user who has 'Admin' role
  static async googleOAuthRegister(req, res, next) {
    try {

      const { username, email } = req.body

      const password = Math.random()

      // let user = await User.create({ username, email, password })
      res.status(201).json({ message: `Congratulations ${username} you have joined Pic Reels community` })
      // res.status(201).json({ message: `Congratulations ${user.username} you have joined Pic Reels community` })
    } catch (error) {
      next(error)
    }
  }


  // Authenticate User data when Login using POST method
  static async userLogin(req, res, next) {
    const { email, password } = req.body
    try {

      if (!email || !password) {
        throw { name: `InvalidEmailorPassword` }
      }

      const user = await User.findOne({ where: { email } })

      if (!user || !comparePassword(password, user.password)) {
        throw { name: `UserNotFound` }
      }

      const token = signToken({ id: user.id })


      res.status(200).json({ access_token: `${token}`, user: { username: user.username, subscription: user.subscription } })
    } catch (error) {
      next(error)
    }
  }

  // Authenticate User data when Login using Google OAuth method
  static async googleOAuthLogin() {
    try {

    } catch (error) {
      next(error)
    }
  }


  static async logout() {
    try {

    } catch (error) {

    }
  }


}