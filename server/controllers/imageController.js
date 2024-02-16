const pexelsKey = process.env.Pexels
const { photos, collections } = require('pexels').createClient(pexelsKey);
const { GoogleGenerativeAI } = require("@google/generative-ai");
const getHour = require('../helpers/getHour');
const randomizer = require('../helpers/randomizer');
const axios = require('axios')
const { User, Tweet, Image } = require("../models")

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GAI);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });



module.exports = class ImageController {

  static async showRandomImages(req, res, next) {
    try {
      const categories = ["Nature", "Ocean", "Cityscape", "Forest", "Mountain", "Sunset", "Dessert", "Nightscape", "Flower", "Universe"]

      const page = randomizer(1, 15)
      const query = categories[getHour()]

      // const response = await photos.search({ query, page: page, per_page: 30 })//).photos
      // const response = await axios({ url: `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${50}`, method: "get", headers: { Authorization: pexelsKey } })
      // const { photos } = response.data

      // console.log(photos);
      // const remainingToken = response.headers['x-ratelimit-remaining']
      // photos.remaining = remainingToken
      // const randomPhoto = photos[randomizer(0, 50)]
      // console.log(photos.remaining);
      // res.status(200).json(randomPhoto)

      const seed = require("../seeds/images.json")
      // console.log(seed);
      const randomSeed = seed[randomizer(0, 50)]
      res.status(200).json(randomSeed)
    } catch (error) {
      next(error)
    }
  }

  static async suggestImageFromMood(req, res, next) {
    try {
      const anger = ["Fire", "Storm", "Scream", "Angry"]
      const sad = ["Tears", "Rainy", "Melancholy", "Mist"]
      const adventurous = ["Waterfall", "Rainy", "Ocean", "Trip"]
      const lonely = ["Reflection", "Night Sky", "Forest", "Snow"]
      const excited = ["Fireworks", "Surf", "Travel", "Support"]
      const happy = ["Celebration", "Spring", "Nature", "Smile"]
      const randomNum = randomizer(0, 3)

      let query;

      const { feeling } = req.query
      console.log(req.query);
      switch (feeling) {
        case "anger":
          query = anger[randomNum]
          break;

        case "sad":
          query = sad[randomNum]
          break;

        case "adventurous":
          query = adventurous[randomNum]
          break;

        case "lonely":
          query = lonely[randomNum]
          break;

        case "excited":
          query = excited[randomNum]
          break;
        case "happy":
          query = happy[randomNum]
          break;
      }

      const page = randomizer(1, 10)

      const response = await axios({ url: `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${50}`, method: "get", headers: { Authorization: pexelsKey } })
      let { data } = response
      const { username, subscription: subscriber } = req.user
      let outputTokens = 10
      subscriber ? outputTokens = 50 : outputTokens
      const config = {
        maxOutputTokens: outputTokens,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      }
      const prompt = `Greet ${username}, comment about him/her feeling which is ${feeling} and images generated for him/her that has ${query} tag. Separate each sentence using\n so it can be easily converted to html limit it into 50-75 and try not to sound AI-ish`

      const { response: result } = await model.generateContent(prompt, config)

      const remainingToken = response.headers['x-ratelimit-remaining']
      const caption = result.text();
      
      console.log(remainingToken);
      res.status(200).json({ ...data, caption, remainingToken })
    } catch (error) {
      next(error)
    }
  }

  static async personalizedCaption(req, res, next) {
    try {
      const { username, subscription: subscriber } = req.user
      const { page, limit } = req.query
      const randomPage = randomizer(1, 50)
      let outputTokens = 10
      const prompt = `Write a message that fulfilled these conditions: asking ${username} about how they're feeling, limit the words to 30-50 and use \n when entering new line, maybe add quotes about feeling like you would to give energy to friend`

      subscriber ? outputTokens = 50 : outputTokens

      let data = await photos.curated({ page: page || randomPage, per_page: limit || 50 });

      const config = {
        maxOutputTokens: outputTokens,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      }

      const { totalTokens } = await model.countTokens(prompt);
      console.log(totalTokens);
      const { response } = await model.generateContent(prompt, config)

      const caption = response.text();

      data = { ...data, caption }

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async writeCaptions(req, res, next) {
    try {
      const prompt = "Write a caption for an image about nature, snow and rain in a single image"
      let subscriber = false
      let outputTokens = 50

      const config = {
        maxOutputTokens: outputTokens,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      }
      const { response } = await model.generateContent(prompt, config)
      const caption = response.text();

      subscriber ? outputTokens = 200 : outputTokens

      res.status(200).json(caption)
    } catch (error) {
      next(error)
    }
  }

  static async bindImages(req, res, next) {
    try {
      const { id, username, subscription } = req.user
      const { imgUrl, feeling } = req.query

      console.log(req.query)
      const emoji = feeling
      const prompt = `Write a caption for ${emoji} in less than 3 sentences separated by \n `

      let subscriber = false
      let outputTokens = 50

      const config = {
        maxOutputTokens: outputTokens,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      }
      const { response } = await model.generateContent(prompt, config)
      const caption = response.text();

      const prompt2 = `create a title for the image based on ${caption}`
      const { response: response2 } = await model.generateContent(prompt2, config)
      const title = response.text();


      subscriber ? outputTokens = 200 : outputTokens

      console.log(feeling);
      const tweet = await Tweet.create({
        title, emoji, caption, UserId: id
      })

      const image = await Image.create({
        TweetId: tweet.id, imgUrl
      })

      const userImages = await Tweet.findAll({
        attributes: ["id", "emoji", "title", "caption"],
        include: [
          {
            model: Image,
            attributes: ["imgUrl"],
          },
          {
            model: User,
            attributes: ["username", "email", "subscription"],
          },
        ],
        where: {
          UserId: id,
        },
      });


      res.status(200).json(userImages)
    } catch (error) {
      next(error)
    }
  }
}