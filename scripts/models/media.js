/**
 * @property {Number} id
 * @property {Date} date
 * @property {Number} likes
 * @property {Boolean} userLike
 * @property {Number} price
 * @property {String} description
 * @property {String} title
 * @property {Photographer} photographer
 * @property {MediaTemplate} template
 */
class Media {
  /**
   * @param {Json} data
   * @param {Photographer} photographer
   */
  constructor (data, photographer) {
    this._id = data.id
    this._photographer = photographer
    this._date = new Date(data.date)
    this._likes = data.likes
    this._price = data.price
    this._title = data.title
    this._userLike = false
    this._description = data.alt
    this._template = null
  }

  /**
   * GETTERS
   */
  get id () {
    return this._id
  }

  get date () {
    return this._date
  }

  get likes () {
    return this._likes
  }

  get userLike () {
    return this._userLike
  }

  get price () {
    return this._price
  }

  get description () {
    return this._description
  }

  get title () {
    return this._title
  }

  get photographer () {
    return this._photographer
  }

  get template () {
    return this._template
  }

  /**
   * SETTERS
   */

  /**
   * @param {MediaTemplate}
   */
  set template (template) {
    this._template = template
  }

  /**
   * @param {Number} value
   */
  set likes (value) {
    this._likes = value
    this._userLike = !this._userLike
  }
}

/**
 * @property {String} thumbPath
 * @property {String} path
 * @property {String} image
 * @property {String} type
 */
export class Picture extends Media {
  /**
   * @param {JSON} data
   */
  constructor (data) {
    super(data)
    this._type = 'picture'
    this._image = data.image
    this._imageThumbPath = `assets/portfolio/${data.photographerId}/medium/${this._image}`
    this._imagePath = `assets/portfolio/${data.photographerId}/large/${this._image}`
  }

  /**
   * GETTERS
   */
  get thumbPath () {
    return this._imageThumbPath
  }

  get path () {
    return this._imagePath
  }

  get image () {
    return this._image
  }

  get type () {
    return this._type
  }
}

/**
 * @property {String} thumbPath
 * @property {String} path
 * @property {String} video
 * @property {String} type
 */
export class Video extends Media {
  /**
   * @param {JSON} data
   */
  constructor (data) {
    super(data)
    this._type = 'video'
    this._video = data.video
    this._videoThumbPath = `assets/portfolio/${data.photographerId}/medium/${this._video.split('.').slice(0, -1).join('.')}.jpg`
    this._videoPath = `assets/portfolio/${data.photographerId}/${this._video}`
  }

  /**
   * GETTERS
   */
  get thumbPath () {
    return this._videoThumbPath
  }

  get path () {
    return this._videoPath
  }

  get video () {
    return this._video
  }

  get type () {
    return this._type
  }
}
