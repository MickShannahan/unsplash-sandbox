import { vibesService } from '../services/VibesService'
import BaseController from '../utils/BaseController'
import { Forbidden } from '../utils/Errors'

function devOnly(req, res, next) {
  if (process.env.NODE_ENV !== 'dev') {
    throw new Forbidden('method not allowed')
  }
  next()
}
export class VibesController extends BaseController {
  constructor() {
    super('api/vibes')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(devOnly)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const vibes = await vibesService.getAll(req.query)
      return res.send(vibes)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const vibe = await vibesService.getById(req.params.id)
      return res.send(vibe)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      return res.send(await vibesService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const message = await vibesService.delete(req.params.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
