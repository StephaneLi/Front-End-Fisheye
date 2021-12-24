/**
 * @property {String} id
 * @property {String} name
 * @property {String} city
 * @property {String} country
 * @property {String} tagline
 * @property {String} price
 * @property {String} portrait
 * @property {Media[]} portfolio
 * @property {Number} likes
 * @property {PhotographerTemplate} templatePhotographer
 * @property {ListMediaTemplate} templatePortfolio
 * @property {ModalTemplate} templateModal
 * @property {FilterSelectTemplate} templateFilter
 */
export default class Photographer {
  /**
   * @param {JSON} data
   */
  constructor (data) {
    this._profilPath = 'assets/photographers/'
    this._id = data.id
    this._name = data.name
    this._city = data.city
    this._country = data.country
    this._tagline = data.tagline
    this._price = data.price
    this._portrait = data.portrait
    this._portfolio = []

    this._templatePhotographer = null
    this._templatePortfolio = null
    this._templateModal = null
    this._templateFilter = null
  }

  /**
   * GETTERS
   */
  get id () {
    return this._id
  }

  get name () {
    return this._name
  }

  get city () {
    return this._city
  }

  get country () {
    return this._country
  }

  get tagline () {
    return this._tagline
  }

  get price () {
    return this._price
  }

  get portrait () {
    return this._profilPath + this._portrait
  }

  get portfolio () {
    return this._portfolio
  }

  get likes () {
    return this._caluculateLikes()
  }

  get templatePhotographer () {
    return this._templatePhotographer
  }

  get templatePortfolio () {
    return this._templatePortfolio
  }

  get templateModal () {
    return this._templateModal
  }

  get templateFilter () {
    return this._templateFilter
  }

  /**
   * SETTERS
   */

  /**
  * @param {Media[]} medias
  */
  set portfolio (medias) {
    this._portfolio = medias
  }

  /**
   * @param {PhotographerTemplate} template
   */
  set templatePhotographer (template) {
    this._templatePhotographer = template
  }

  /**
   * @param {MediaTemplate} template
   */
  set templatePortfolio (template) {
    this._templatePortfolio = template
  }

  /**
   * @param {ContactModalTemplate} template
   */
  set templateModal (template) {
    this._templateModal = template
  }

  /**
   * @param {FilterSelectTemplate} template
   */
  set templateFilter (template) {
    this._templateFilter = template
  }

  /**
   * Ajout d'un media dans le portfolio
   * @param {Media} media
   */
  addPortfolioMedia (media) {
    this._portfolio.push(media)
    this._likes += media.likes
  }

  /**
   * Suppression d'un media dans le portfolio
   * @param {Media} media
   */
  removePortfolioMedia (media) {
    this._portfolio = this._portfolio.filter(element => element !== media)
    this._likes -= media.likes
  }

  /**
   * PRIVATE Calcul les Likes de tous les medias
   * @returns {Number}
   */
  _caluculateLikes () {
    let totalLikes = 0
    this._portfolio.forEach(media => {
      totalLikes += media.likes
    })

    return totalLikes
  }
}
