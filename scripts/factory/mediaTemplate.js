/**
 * Template : Genère une list de cards pour les médias
 * @property {HTMLElement} mediasHtmlElement
 */
export default class ListMediaTemplate {
  /**
   * @param {Photographer} photographer
   */
  constructor (photographer) {
    this._photographer = photographer
    this.$wrapperListCards = null
  }

  /**
   * GETTERS
   */
  get mediasHtmlElement () {
    return this.$wrapperListCards
  }

  /**
   * Template Pour une liste de Media Cards
   * @returns {HTMLElement}
   */
  createListMedia () {
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
   * Rafraichi la list des médias en fonction du filtre
   * @param {Function} callback
   */
  refreshListMedia (callback = () => {}) {
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
 * @property {Photographer} mediaHtmlElement
 */
export class MediaTemplate {
  /**
   * @param {Photographer} photographer
   * @param {Media} media
  */
  constructor (photographer, media) {
    this._photographer = photographer
    this._media = media
    this.$wrapperCard = null
  }

  /**
   * GETTERS
   */
  get mediaHtmlElement () {
    return this.$wrapperCard
  }

  /**
   * Template Media Card
   * @returns {HtmlElement}
   */
  createCardMedia (tagName) {
    this.$wrapperCard = document.createElement(tagName)
    this.$wrapperCard.classList.add('media-card')
    this.$wrapperCard.classList.add(`media-card--${this._media.type}`)

    const card = `         
      <a href="${this._media.path}" class="media-card__cover" aria-label="${this._media.title}, closeup view">          
        <img width="100" src="${this._media.thumbPath}" alt="${this._media.description}, ${this._media.type}"/>        
      </a> 
      <div class="media-card__content">
        <h2 class="media-card__content__title">${this._media.title}</h2>
        <div class="media-card__content__like favorite">
          <label for="like-${this._media.id}" class="favorite__counter">${this._media.likes}</label>
          <input id="like-${this._media.id}" aria-label="likes" class="favorite__input" type="checkbox" />
        </div>
      </div>
    `
    this.$wrapperCard.innerHTML = card
    this.$wrapperCard.querySelector(`#like-${this._media.id}`).checked = this._media.userLike
    this._stateLikesListener()
    return this.$wrapperCard
  }

  /**
   * PRIVATE Ecouteur d'evenement incrementation Likes
   */
  _stateLikesListener () {
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
