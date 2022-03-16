import axios from 'axios'
import { BgImage } from '../models/bgImage'
import { EasyCache } from '../utils/EasyCache'
import { logger } from '../utils/Logger'

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com/photos/',
  timeout: 5000,
  params: { client_id: process.env.UNSPLASH_KEY, content_filter: 'high' }
})

const urlFormat = 'https://images.unsplash.com/photo-[*]&cs=tinysrgb&crop=entropy&fit=crop&fm=jpgq=80'

const cache = new EasyCache(60000 * 3)
const bgCache = new EasyCache(60000 * 5)

class ImagesService {
  async get(query = '') {
    const res = await unsplash.get(query)
    logger.log(res.headers)
    return res.data
  }

  async getKeep(query = '', quality = 'full') {
    const cached = cache.hasEntry(query)
    let img
    if (!cached) {
      const res = await unsplash.get('random?query=' + query)
      img = res.data.urls[quality]
      cache.setEntry(query, img)
    } else {
      img = cached.value
    }
    const start = img.indexOf('-') + 1
    const end = img.indexOf('&')
    const imgUri = urlFormat.replace('[*]', img.slice(start, end))
    const height = '&h=' + ((Math.ceil(Math.random() * 4) * 150) + 400)
    const width = '&w=' + ((Math.ceil(Math.random() * 4) * 150) + 400)
    return imgUri + height + width
  }

  async getBackground(query = '') {
    const cached = bgCache.hasEntry(query)
    let img
    if (!cached) {
      const res = await unsplash.get('random?orientation=landscape&query=' + query)
      img = new BgImage(res.data)
      bgCache.setEntry(query, img)
    } else {
      img = cached.value
    }
    return img
  }
}

export const imagesService = new ImagesService()
