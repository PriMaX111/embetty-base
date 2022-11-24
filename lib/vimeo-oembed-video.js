const Video = require('./video')

module.exports = class VimeoOembedVideo extends Video {
  constructor(id, options) {
    super(id, options)

    this.h = options.h
    this.width = options.width
    this.height = options.height
    this.requestTimeout = 20000
  }

  get _requestOptions() {
    let uri = `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${this.id}/${this.h}`
    if (this.width && this.height) uri = `${uri}&width=${this.width}&height=${this.height}`
    return {
      uri,
      json: true,
    }
  }

  get type() {
    return 'vimeo'
  }

  get posterImageUrlWithoutImageSize() {
    return this.data.thumbnail_url.replace(/[^-d_]*$ */g, '')
  }

  get getPosterImageWithNewImageSize() {
    const posterImageWithoutImageSize = this.posterImageUrlWithoutImageSize
    return `${posterImageWithoutImageSize}${this.width}x${this.height}`
  }

  get posterImageUrl() {
    if (this.width && this.height) {
      return this.getPosterImageWithNewImageSize
    } else {
      return this.data.thumbnail_url
    }
  }
}
