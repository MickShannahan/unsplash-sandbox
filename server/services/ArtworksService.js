import axios from 'axios'
import { EasyCache } from '../utils/EasyCache.js'
import { logger } from '../utils/Logger.js'
const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com/collections/kWD2dMCwvy0',
  timeout: 5000,
  params: { client_id: process.env.UNSPLASH_KEY }
})

class ArtworksService {
  pageShift = Math.round(Math.random() * 50)
  async getArtworks(query) {
    const page = parseInt(query.page) || 1
    const count = parseInt(query.count) || 15
    let artworks
    const cached = cache.hasEntry(page)
    const collection = await this.getCollection()
    const pages = Math.ceil(collection.total_photos / count)
    logger.log(cached)
    if (!cached) {
      const { data: artData } = await unsplash.get('photos', { params: { page: (this.pageShift + page) % pages, per_page: count } })
      artworks = formatArtworks(artData)
      cache.setEntry(page, artData)
    } else {
      artworks = cached.value.map(a => new Artwork(a))
    }
    return { page, pages, artworks }
  }

  async getCollection() {
    const cached = cache.hasEntry('collection')
    if (!cached) {
      const { data: collection } = await unsplash.get('')
      cache.setEntry('collection', collection)
      this.pieceCount = collection.total_photos
      return collection
    }
    return cached.value
  }
}

function formatArtworks(dataArr) {
  const out = dataArr.map(a => new Artwork(a))
  return out
}

class Artwork {
  constructor(data) {
    this.id = data.id
    this.slug = data.slug
    this.height = data.height
    this.width = data.width
    this.originalLink = data.originalLink || data.links.html
    this.imgUrls = data.urls
    this.description = data.description
    this.altDescription = data.altDescription || data.description_alt || null
    this.attribution = data.attribution || data.user.name
    this.color = data.color
  }
}

export const artworksService = new ArtworksService()

const hours = 1000 * 60 * 60
const cache = new EasyCache(8 * hours)
