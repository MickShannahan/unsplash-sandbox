import { imagesService } from '../services/ImagesService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class ImagesController extends BaseController {
  constructor() {
    super('api/images')
    this.router
      .get('/random', this.getRandom)
      .get('/keep', this.getKeep)
  }

  async getRandom(req, res, next) {
    try {
      const query = req.query.query ? '?query=' + req.query.query : ''
      const image = await imagesService.get('random' + query)
      return res.send(image)
    } catch (error) {
      next(error)
    }
  }

  async getKeep(req, res, next) {
    const categories = ['cat', 'dog', 'animal', 'forrest', 'trees', 'nature', 'landscape', 'technology', 'travel', 'coffee', 'food', 'architecture']
    try {
      logger.log(req.query.query)
      const query = req.query.query !== undefined ? req.query.query : categories[Math.floor(Math.random() * categories.length)]
      logger.log(query, req.query)
      const image = await imagesService.getKeep('random?query=' + query, req.query.quality)
      return res.send({ url: image })
    } catch (error) {

    }
  }
}
