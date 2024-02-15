const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = authentication = async (req, res, next) => {
  try {

    const access_token = req.headers.authorization

    if (!access_token) throw { name: "PleaseLogin" }
    
    const [bearer, token] = access_token.split(" ")
    
    if (!bearer || bearer !== "Bearer") throw { name: "InvalidToken" }

    if (!token) throw { name: "InvalidToken" }

    const payload = verifyToken(token)

    const user = await User.findByPk(payload.id)
    
    if (!user) throw { name: "UserNotFound" }

    req.user = {
      id: user.id,
      username: user.username,
      subscription: user.subscription
    }
    
    next()
  } catch (error) {
    next(error)
  }
}