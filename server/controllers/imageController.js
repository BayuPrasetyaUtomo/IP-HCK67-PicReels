const pexelsKey = "49Dco2bEQalKgAAqASfKJrsLY9eRvmZmkMVPliaNjC8pfwTo7vFykmrv"
const { photos } = require('pexels').createClient(pexelsKey);


module.exports = class ImageController {

  static async showCuratedImage(req, res, next) {
    try {

      const { page, limit } = req.query

      // const data = req.query
      const data = await photos.curated({ page: page ? page : 1, per_page: limit ? limit : 50 });

      console.log(data);
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}