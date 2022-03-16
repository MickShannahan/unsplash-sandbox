import { imagesService } from '../services/ImagesService'
import BaseController from '../utils/BaseController'

export class ImagesController extends BaseController {
  constructor() {
    super('api/images')
    this.router
      .get('/random', this.getRandom)
      .get('/keep', this.getKeep)
      .get('/background', this.getBackground)
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
    const categories = ['cat', 'dog', 'animal', 'forrest', 'trees', 'nature', 'landscape', 'technology', 'code', 'travel', 'coffee', 'food', 'architecture', 'handmade', 'camera']
    try {
      const query = req.query.query !== undefined ? req.query.query : categories[Math.floor(Math.random() * categories.length)]
      const image = await imagesService.getKeep(query, req.query.quality)
      return res.send({ url: image })
    } catch (error) {

    }
  }

  async getBackground(req, res, next) {
    const categories = ['forrest', 'mountain', 'jungle', 'desert', 'canyon', 'landscape', 'misty forrest', 'trees', 'vegetation', 'wood', 'woodland', 'reef', 'ocean cliff', 'nature']
    try {
      const query = req.query.query !== undefined ? req.query.query : categories[Math.floor(Math.random() * categories.length)]
      const image = await imagesService.getBackground(query)
      return res.send(image)
    } catch (error) {

    }
  }
}
