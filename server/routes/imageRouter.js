const { showRandomImages, showFeaturedImages, showCuratedImages, writeCaptions } = require("../controllers/imageController")
const imageRouter = require('express').Router()
const authentication = require('../middlewares/authentication')

imageRouter.get("/images", authentication, showCuratedImages)
imageRouter.get("/surprise", showRandomImages)
imageRouter.get("/featured", authentication, showFeaturedImages)
imageRouter.get("/caption", authentication, writeCaptions)
module.exports = imageRouter