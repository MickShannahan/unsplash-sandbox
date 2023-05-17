const urlFormat = 'https://images.unsplash.com/photo-[*]&cs=tinysrgb&crop=entropy&fit=crop&fm=jpgq=80'
export class BgImage {
  constructor(data) {
    this.full = data.urls.full
    this.large = data.urls.raw
    this.medium = data.urls.regular
    this.small = data.urls.small
    this.photographer = data.user.name
    this.portfolio = data.user.links.html
    this.description = data.description || 'no description'
  }

  formatUrl(url) {
    const start = url.indexOf('-') + 1
    const end = url.indexOf('&')
    const imgUri = urlFormat.replace('[*]', url.slice(start, end))
    return imgUri
  }
}
