import { jsonService } from '../services/JSONService.js'
import BaseController from '../utils/BaseController.js'

export class JSONcontroller extends BaseController {
  constructor() {
    super('api/json')
    this.router
      .get('/entries', this.getEntries)
      .delete('/:cluster/delete/all', this.removeCluster)
      .get('/:cluster', this.getData)
      .get('/:cluster/:id', this.getOne)
      .post('/:cluster', this.create)
      .put('/:cluster/:id', this.update)
      .delete('/:cluster/:id', this.remove)
  }

  async getData(req, res, next) {
    try {
      const data = await jsonService.getAll(req.params.cluster)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const data = await jsonService.getOne(req.params.cluster, req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const data = await jsonService.create(req.params.cluster, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const data = await jsonService.update(req.params.id, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const data = await jsonService.remove(req.params.cluster, req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getEntries(req, res, next) {
    try {
      const data = await jsonService.getEntries()
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async removeCluster(req, res, next) {
    try {
      const count = await jsonService.removeCluster(req.params.cluster)
      return res.send(count)
    } catch (error) {
      next(error)
    }
  }
}
