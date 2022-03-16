import { logger } from './Logger'

export class EasyCache {
  async getEntry(key, cb) {
    try {
      const entry = this.hasEntry(key)
      if (entry) { return entry.value }
      const data = await cb()
      if (!data) {
        delete this.cache[key]
        return
      }
      return this.setEntry(key, data)
    } catch (e) {
      logger.error('EASY_CACHE_ERROR', e)
    }
  }

  hasEntry(key) {
    const cached = this.cache[key] || { ttl: 0, value: [] }
    this.cache[key] = cached
    if (cached.ttl > Date.now()) {
      return JSON.parse(JSON.stringify(cached))
    }
  }

  setEntry(key, value) {
    this.cache[key] = { ttl: Date.now() + this.ttl, value: JSON.parse(JSON.stringify(value)) }
    return this.cache[key].value
  }

  removeEntry(key) {
    delete this.cache[key]
  }

  clear() {
    for (const key in this.cache) {
      delete this.cache[key]
    }
  }

  constructor(ttl = 60000) {
    this.cache = {}
    this.ttl = ttl
  }
}
