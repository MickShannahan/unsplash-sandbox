import { artworksService } from '../services/ArtworksService.js'
import BaseController from '../utils/BaseController.js'

export class ArtworksController extends BaseController {
  constructor() {
    super('api/artworks')
    this.router
      .get('', this.getArtworks)
      .get('/:artId', this.getArtworkById)
  }

  async getArtworks(req, res, next) {
    try {
      const artworks = await artworksService.getArtworks(req.query)
      res.send(artworks)
    } catch (error) {
      next(error)
    }
  }

  async getArtworkById(req, res, next){
    try {
      const artwork = await artworksService.getArtworkById(req.params.artId)
      res.send(artwork)
    } catch (error) {
      next(error)
    }
  }
}
