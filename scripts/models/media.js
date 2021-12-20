export class Media {
  /**
   * @param {Json} data 
   * @param {Photographer} photographer 
   */
  constructor(data, photographer) {
    this._id= data.id
    this._photographer = photographer
    this._date = new Date(data.date)
    this._likes = data.likes
    this._price = data.price
    this._title = data.title
    this._description = ''
    this._template = null
  }

  get id() {
    return this._id 
  }
  get date() {
    return this._date
  }
  get likes(){
    return this._likes
  }
  get price(){
    return this._price
  }
  get description() {
    return this._description
  }
  get title() {
    return this._title
  }
  get photographer() {
    return this._photographer
  }

  /**
   * @param {Number} value 
   */
  set likes(value){
    this._likes = value
  }

  /**
   * @param {MediaTemplate} template
   */
  set template(template) {
    this._template = template
  }
}

export class Picture extends Media{
  constructor(data, photographer) {
    super(data, photographer)
    this._type = 'picture'
    this._image = data.image
  }

  get image() {
    return this._image
  }
  get type() {
    return this._type
  }
}

export class Video extends Media{
  constructor(data, photographer) {
    super(data, photographer)
    this._type = 'video'
    this._video = data.video
  }

  get video() {
    return this._video
  }
  get type() {
    return this._type
  }
}