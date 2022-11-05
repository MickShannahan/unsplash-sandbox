import { giphsService } from '../services/GiphsService'
import BaseController from '../utils/BaseController'
import { BadRequest } from '../utils/Errors'

function checkForKey(req, res, next) {
  if (!req.query.api_key) {
    throw new BadRequest('no api key in url')
  }
  next()
}

export class GiphsController extends BaseController {
  constructor() {
    super('api/giphy')
    this.router
      .use(checkForKey)
      .get('/search', this.search)
  }

  async search(req, res, next) {
    try {
      const giphs = await giphsService.search(req.query, req.socket.remoteAddress)
      return res.send(giphs)
    } catch (error) {
      next(error)
    }
  }
}
