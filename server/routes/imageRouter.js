const { writeCaptions, suggestImageFromMood, personalizedCaption, showRandomImages} = require("../controllers/imageController")
const imageRouter = require('express').Router()
const authentication = require('../middlewares/authentication')

imageRouter.get("/surprise", showRandomImages)
imageRouter.get("/caption", authentication, writeCaptions)
imageRouter.get("/greet", authentication, personalizedCaption)

imageRouter.get("/feelings", authentication, suggestImageFromMood)

module.exports = imageRouter