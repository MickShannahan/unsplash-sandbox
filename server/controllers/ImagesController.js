import { imagesService } from '../services/ImagesService'
import BaseController from '../utils/BaseController'

export class ImagesController extends BaseController {
  constructor() {
    super('api/images')
    this.router
      .get('/random', this.getRandom)
      .get('/keep', this.getKeep)
      .get('/background', this.getBackground)
      .get('/event', this.getEvent)
  }

  async getRandom(req, res, next) {
    try {
      const image = await imagesService.get('random', req.query)
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
      next(error)
    }
  }

  async getBackground(req, res, next) {
    const categories = ['forrest', 'mountain', 'jungle', 'desert', 'canyon', 'landscape', 'misty forrest', 'trees', 'vegetation', 'wood', 'woodland', 'reef', 'ocean cliff', 'nature']
    try {
      const query = req.query.query !== undefined ? req.query.query : categories[Math.floor(Math.random() * categories.length)]
      const image = await imagesService.getBackground(query)
      return res.send(image)
    } catch (error) {
      next(error)
    }
  }

  async getEvent(req, res, next) {
    try {
      const categories = ['event', 'concert', 'rock concert', 'sports', 'digital']
      const query = req.query.query !== undefined ? req.query.query : categories[Math.floor(Math.random() * categories.length)]
      const image = await imagesService.getEvent(query)
      return res.send({ url: image })
    } catch (error) {
      next(error)
    }
  }
}
