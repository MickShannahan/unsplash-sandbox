import { dbContext } from '../db/DbContext.js'

class JSONservice {
  async removeCluster(cluster) {
    const count = await dbContext.JSON.count({ cluster })
    await dbContext.JSON.deleteMany({ cluster })
    return count + ' items removed'
  }

  async getAll(cluster) {
    const data = await dbContext.JSON.find({ cluster })
    return data
  }

  async getOne(cluster, id) {
    const data = await dbContext.JSON.findOne({ _id: id, cluster })
    return data
  }

  async create(cluster, body) {
    body.cluster = cluster
    const data = await dbContext.JSON.create(body)
    return data
  }

  async update(id, body) {
    const data = await dbContext.JSON.findByIdAndUpdate(id, body, { new: true })
    return data
  }

  async remove(cluster, id) {
    const data = await dbContext.JSON.findById(id)
    if (!data) throw new Error('No data with that id: ' + id)
    await data.remove()
    return 'removed entry ' + id
  }

  async getEntries() {
    const entries = await dbContext.JSON.aggregate([{
      $group: {
        _id: '$cluster',
        count: { $sum: 1 }
      }
    }])
    return entries.map(e => { return { cluster: e._id, count: e.count } })
  }
}

export const jsonService = new JSONservice()
