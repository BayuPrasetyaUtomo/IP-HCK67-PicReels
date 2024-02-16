const { User } = require("../models")
const { signToken, verifyToken } = require("../helpers/jwt")
const { comparePassword } = require("../helpers/bcrypt")
const { OAuth2Client } = require('google-auth-library');
const google_oauth_client = new OAuth2Client();

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
  static async googleOAuthLogin(req, res, next) {
    try {
      const { google_token } = req.headers

      const ticket = await google_oauth_client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GCID
      });
      const { name: username, email } = ticket.getPayload();

      let user = await User.findOne({ where: { email } })

      if (!user) {
        user.create({
          username,
          email,
          password: String(Math.random())
        }, {
          hooks: false
        })
        const token = signToken({ id: user.id })
        res.status(200).json({ access_token: `${token}`, user: { username: user.username, subscription: user.subscription } })
      }

      const token = signToken({ id: user.id })
      res.status(200).json({ access_token: `${token}`, user: { username: user.username, subscription: user.subscription } })
    } catch (error) {
      next(error)
    }
  }


  // static async leave() {
  //   try {

  //     const { id, username } = req.user

  //     console.log(id);
  //     const user = await User.findByPk(id)

  //     user && user.destroy({ where: { id } })

  //     res.status(200).json({ message: `It's unfortunate that you leave, but I hope you the best in your journey ${username}` })
  //   } catch (error) {

  //   }
  // }


}