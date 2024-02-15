const { showRandomImages, showFeaturedImages, showCuratedImages, writeCaptions, suggestImageFromMood, personalizedCaption, myImageFeeling } = require("../controllers/imageController")
const imageRouter = require('express').Router()
const authentication = require('../middlewares/authentication')

imageRouter.get("/surprise", showRandomImages)
imageRouter.get("/images", authentication, showCuratedImages)
imageRouter.get("/featured", authentication, showFeaturedImages)
imageRouter.get("/caption", authentication, writeCaptions)
imageRouter.get("/greet", authentication, personalizedCaption)
imageRouter.get("/img-feel", authentication, myImageFeeling)

imageRouter.get("/feelings", authentication, suggestImageFromMood)

module.exports = imageRouter