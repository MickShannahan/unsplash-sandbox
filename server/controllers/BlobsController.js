import upload from 'express-fileupload'
import { blobsService } from '../services/BlobsService.js'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger.js'

export class BlobsController extends BaseController {
  constructor() {
    super('api/blobs')
    this.router
      .use(upload())
      .post('', this.create)
    // .delete('', this.remove)
  }

  async create(req, res, next) {
    try {
      logger.log(req.files)
      const container = req.query.container
      const url = await blobsService.create(container, req.files.file)
      return res.send({ url: url })
    } catch (error) {
      next(error)
    }
  }
}
