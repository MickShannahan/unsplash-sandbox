import { dbContext } from '../db/DbContext'

class VibesService {
  async getAll(query = {}) {
    const vibes = await dbContext.Vibes.find(query, { name: 1 }).sort({ plays: -1 })
    return vibes
  }

  async getById(id) {
    const vibe = await dbContext.Vibes.findById(id)
    vibe.plays++
    await vibe.save()
    return vibe
  }

  async create(body) {
    const vibe = await dbContext.Vibes.create(body)
    return vibe
  }

  async delete(id) {
    await dbContext.Vibes.findByIdAndRemove(id)
    return 'deleted'
  }
}

export const vibesService = new VibesService()
