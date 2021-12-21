// PHOTOGRAPHER : Structure le modele de donnée du photographe avec Getters et Setters
export default class Photographer {

  _profilPath = 'assets/photographers/'
  
  constructor(data) {
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

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get city() {
    return this._city
  }

  get country() {
    return this._country
  }

  get tagline() {
    return this._tagline
  }

  get price() {
    return this._price
  }

  get portrait() {
    return this._profilPath + this._portrait
  }

  get portfolio() {
    return this._portfolio
  }

  get likes() {
    return this._caluculateLikes()
  }

  get templatePhotographer() {
    return this._templatePhotographer
  }

  get templatePortfolio() {
    return this._templatePortfolio
  }

  get templateModal() {
    return this._templateModal
  }

  get templateFilter() {
    return this._templateFilter
  }

  /**
  * @param {Media[]} medias
  */
  set portfolio(medias) {
    this._portfolio = medias
  }

  /**
   * @param {PhotographerTemplate} template
   */
  set templatePhotographer(template) {
    this._templatePhotographer = template
  }

  /**
   * @param {MediaTemplate} template
   */
  set templatePortfolio(template) {
    this._templatePortfolio = template
  }

  /**
   * @param {ContactModalTemplate} template
   */
     set templateModal(template) {
      this._templateModal = template
    }

  /**
   * @param {FilterSelectTemplate} template
   */
     set templateFilter(template) {
      this._templateFilter = template
    }

  /**
   * @param {Media} media 
   */
  addPortfolioMedia(media) {
    this._portfolio.push(media)
    this._likes += media.likes
  }

  /**
   * @param {Media} media 
   */
  removePortfolioMedia(media) {
    this._portfolio = this._portfolio.filter(element => element !== media)
    this._likes -= media.likes
  }

  /**
   * @returns {Number}
   */
  _caluculateLikes() {
    let totalLikes = 0
    this._portfolio.forEach(media => {
      totalLikes += media.likes
    })

    return totalLikes
  }
}