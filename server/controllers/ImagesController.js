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

  categories = ['cat', 'forrest', 'trees', 'technology', 'coffee', 'architecture']
  async getKeep(req, res, next) {
    try {
      const query = req.query?.query || this.categories[Math.floor(Math.random() * this.categories.length)]
      logger.log(query, req.query)
      const image = await imagesService.getKeep('random?query=' + query, req.query.quality)
      return res.send({ url: image })
    } catch (error) {

    }
  }
}
