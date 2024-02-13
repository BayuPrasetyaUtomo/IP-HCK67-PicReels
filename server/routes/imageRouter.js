const { showAllImage, showCuratedImage } = require("../controllers/imageController")
const imageRouter = require('express').Router()

imageRouter.get("/images", showCuratedImage)
// imageRouter.get("/images", showCuratedImage)
module.exports = imageRouter