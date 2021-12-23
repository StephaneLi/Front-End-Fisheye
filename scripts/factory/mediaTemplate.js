import LightBox from "../controller/lightbox"

/**
 * Template : Genère une list de cards pour les médias
 * @property {Photographer} _photographer
 * @property {HTMLElement} $wrapperListCards
 */
export default class ListMediaTemplate {
  /**
   * @param {Photographer} 
   */
  constructor(photographer) {
    this._photographer = photographer
    this.$wrapperListCards = null
  }

  get mediasHtmlElement() {
    return this.$wrapperListCards
  }

  /**
   * @returns {HTMLElement}
   */
  createListMedia() {
    this.$wrapperListCards = document.createElement('ul')
    this.$wrapperListCards.classList.add('media-cards-list')

    this._photographer.portfolio.forEach(media => {
      const mediaTemplate = new MediaTemplate(this._photographer, media)
      media.template = mediaTemplate
      this.$wrapperListCards.appendChild(mediaTemplate.createCardMedia('li'))
    })

    return this.$wrapperListCards
  }

  /**
   * Rafraichi la list des médias en fonction des filtres
   * @param {Function} callback
   */
  refreshListMedia(callback = () => {}) {    
    const parentNode = this.$wrapperListCards.parentNode

    parentNode.classList.remove('loaded')
    parentNode.classList.add('loading')

    const timer = setTimeout(() => {
      parentNode.removeChild(this.$wrapperListCards)
      parentNode.appendChild(this.createListMedia())
      parentNode.classList.remove('loading')
      parentNode.classList.add('loaded')
      callback()
      clearTimeout(timer)
    }, 300)
  }
}

/**
 * Template : Genère une carte media
 * @property {Photographer} _photographer
 * @property {Media} _media
 * @property {HTMLElement} $wrapperCard
 */
export class MediaTemplate {
  /**
  * @param {Media} media 
  */
  constructor(photographer, media) {
    this._photographer = photographer
    this._media = media
    this.$wrapperCard = null
  }

  get mediaHtmlElement() {
    return this.$wrapperCard
  }

  /**
   * @returns {HtmlElement}
   */
  createCardMedia (tagName) {
    this.$wrapperCard = document.createElement(tagName)
    this.$wrapperCard.classList.add('media-card')
    this.$wrapperCard.classList.add(`media-card--${ this._media.type }`)

    const card = `         
      <a href="${ this._media.path }" class="media-card__cover">          
        <img width="100" src="${ this._media.thumbPath }" alt="${ this._media.description }"/>        
      </a> 
      <div class="media-card__content">
        <a href="${ this._media.path }"><h2 class="media-card__content__title">${ this._media.title }</h2></a>
        <div class="media-card__content__like favorite">
          <label aria-label="like-${ this._media.id }" for="like-${ this._media.id }" class="favorite__counter">${ this._media.likes }</label>
          <input id="like-${ this._media.id }" class="favorite__input" type="checkbox" />
        </div>
      </div>
    `
    this.$wrapperCard.innerHTML = card
    this.$wrapperCard.querySelector(`#like-${ this._media.id }`).checked = this._media.userLike
    this._stateLikesListener()
    return this.$wrapperCard
  }

  /**
   * Ecouteur d'evenement incrementation Likes
   */
  _stateLikesListener() {
    this.$wrapperCard.querySelector('input[type="checkbox"]').addEventListener('click', (e) => {
      if (e.target.checked) {        
        this._media.likes += 1        
      } else {
        this._media.likes -= 1 
      }
      this.$wrapperCard.querySelector('label.favorite__counter').innerHTML = this._media.likes
      
      // Rafraichie le le ContentPhotographerLink
      this._photographer.templatePhotographer.refreshPhotographerContentLink()
    })
  }
}