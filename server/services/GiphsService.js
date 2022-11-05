import axios from 'axios'

const giphApi = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs/',
  timeout: 5000,
  params: {
    rating: 'pg',
    limit: 20
  }
})
// api_key: process.env.GIPHY_KEY,

class Gif {
  constructor(data, uid) {
    this.id = data.id
    this.title = data.title
    this.url = data.images.downsized.url
    this.rating = data.rating
    this.slug = data.slug
    this.user = uid
  }
}

class GiphsService {
  async search(query, uid) {
    const giphs = await giphApi.get('search?api_key=' + query.api_key + '&q=' + query.q)
    return giphs.data.data.map(g => new Gif(g, uid))
  }
}

export const giphsService = new GiphsService()
