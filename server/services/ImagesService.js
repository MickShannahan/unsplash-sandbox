import axios from 'axios'
import { EasyCache } from '../utils/EasyCache'

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com/photos/',
  timeout: 5000,
  params: { client_id: process.env.UNSPLASH_KEY }
})

const urlFormat = 'https://images.unsplash.com/photo-[*]&cs=tinysrgb&crop=entropy&fit=crop&fm=jpgq=80'

const cache = new EasyCache(60000 * 1.5)

class ImagesService {
  async get(query = '') {
    const res = await unsplash.get(query)
    return res.data
  }

  async getKeep(query = '', quality = 'regular') {
    const cached = cache.hasEntry(query)
    let img
    if (!cached) {
      const res = await unsplash.get(query)
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
}

export const imagesService = new ImagesService()
