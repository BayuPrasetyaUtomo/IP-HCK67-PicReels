const pexelsKey = process.env.Pexels
const { photos, collections } = require('pexels').createClient(pexelsKey);
const { GoogleGenerativeAI } = require("@google/generative-ai");
const getHour = require('../helpers/getHour');
const randomizer = require('../helpers/randomizer');
const axios = require('axios')

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GAI);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });



module.exports = class ImageController {

  static async showCuratedImages(req, res, next) {
    try {

      const { page, limit } = req.query
      const randomPage = randomizer(1, 30)
      const data = await photos.curated({ page: page || randomPage, per_page: limit || 50 });

      console.log(data);
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async showFeaturedImages(req, res, next) {
    try {

      const { page, limit } = req.query
      const randomPage = randomizer(1, 30)
      const data = await collections.featured({ page: page || 1, per_page: limit || 50 });

      console.log(data);
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async showMoodImages(req, res, next) {
    try {

      const { page, limit } = req.query

      const data = await photos.curated({ page: page || 1, per_page: limit || 50 });

      console.log(data);
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async showRandomImages(req, res, next) {
    try {
      const categories = ["Nature", "Ocean", "Cityscape", "Forest", "Mountain", "Sunset", "Dessert", "Nightscape", "Flower", "Universe"]

      const page = randomizer(1, 15)
      const query = categories[getHour()]

      // const response = await photos.search({ query, page: page, per_page: 30 })//).photos
      const response = await axios({ url: `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${50}`, method: "get", headers: { Authorization: pexelsKey }})
      // const photos = require("../seeds/images.json")
      const {photos} = response.data

      // const remainingToken = response.headers['x-ratelimit-remaining']
      // photos.remaining = remainingToken
      const randomPhoto = photos[randomizer(0, 50)]
      res.status(200).json(randomPhoto)
    } catch (error) {
      next(error)
    }
  }

  static async suggestImageFromMood(req, res, next) {
    try {
      
    } catch (error) {
      next(error)
    }
  }

  static async writeCaptions(req, res, next) {
    try {
      const prompt = "Write a caption for an image about nature, snow and rain in a single image"
      let subscriber = false
      let outputTokens = 50
      console.log(outputTokens);

      const config = {
        maxOutputTokens: outputTokens,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      }
      const { response } = await model.generateContent(prompt, config)
      const caption = response.text();

      // subscriber = true
      subscriber ? outputTokens = 200 : outputTokens
      console.log(outputTokens, "true");
      console.log(model.generationConfig);
      console.log(caption);
      res.status(200).json(caption)
    } catch (error) {
      next(error)
    }
  }
}