/**
 * Créé un portfolio à partir d'une liste de medias
 */
export class ListMediaTemplate {
  /**
   * @param {Photographer} 
   */
  constructor(photographer) {
    this._photographer = photographer
  }

  /**
   * @returns {HTMLElement}
   */
  createListMedia() {
    this.$wrapperListCards = document.createElement('ul')
    this.$wrapperListCards.classList.add('media-cards-list')

    this._photographer.portfolio.forEach(media => {
      const mediaTemplate = new MediaTemplate(media)
      media.template = mediaTemplate
      this.$wrapperListCards.appendChild(mediaTemplate.creatCardMedia('li'))
    })

    return this.$wrapperListCards
  }
}

/**
 * Créé un template HTML avec Un element Media (Le contenu different en fonction du type de media)
 */
export class MediaTemplate extends ListMediaTemplate {
  _imgPath = 'assets/porfolio'

  /**
  * @param {Media} media 
  */
  constructor(media) {
    super()
    this._media = media
    this.$wrapperCard = null
  }

  /**
   * Factory Pattern : Retourne un contenu different en fonction du type de media
   * @param {String} tagname 
   * @returns {HTMLElement}
   */
  creatCardMedia(tagname = 'div') {
    if (this._media.type === 'picture') {
      return this._createCardMediaPicture(tagname)
    } else if (this._media.type === 'video') {
      return this._createCardMediaVideo(tagname)
    } else {
      throw 'Le type de média est inconnu'
    }
  }

  _stateLikesListener() {
    this.$wrapperCard.querySelector('input[type="checkbox"]').addEventListener('click', (e) => {
      if (e.target.checked) {        
        this._media.likes += 1        
      } else {
        this._media.likes -= 1 
      }
      this.$wrapperCard.querySelector('label.favorite__counter').innerHTML = this._media.likes
      this._media.photographer.template.refreshPhotographerContentLink()
    })
  }

  /**
   * @returns {HtmlElement}
   */
  _createCardMediaPicture (tagName) {
    this.$wrapperCard = document.createElement(tagName)
    this.$wrapperCard.classList.add('media-card')

    const card = `         
      <a href="#" class="media-card__cover">          
        <img width="100" src="${ this._imgPath }/${ this._media.photographer.id }/${ this._media.image }" alt="${ this._media.description }"/>        
      </a> 
      <div class="media-card__content">
        <a href="#"><h2 class="media-card__content__title">${ this._media.title }</h2></a>
        <div class="media-card__content__like favorite">
          <label aria-label="like" for="like" class="favorite__counter">${ this._media.likes }</label>
          <input id="like" class="favorite__input" type="checkbox" />
        </div>
      </div>
    `
    
    this.$wrapperCard.innerHTML = card
    this._stateLikesListener()
    return this.$wrapperCard
  }

  /**
  *  @returns {HtmlElement}
   */
  _createCardMediaVideo (tagName) {
    this.$wrapperCard = document.createElement(tagName)
    this.$wrapperCard.classList.add('media-card')

    const card = `         
      <a href="#" class="media-card__cover">          
        <video>
          <source src="${ this._imgPath }/${ this._media.photographer.id }/${ this._media.video }" type="video/mp4">
        </video>    
      </a> 
      <div class="media-card__content">
        <a href="#"><h2 class="media-card__content__title">${ this._media.title }</h2></a>
        <div class="media-card__content__like favorite">
          <label aria-label="like" for="like" class="favorite__counter">${ this._media.likes }</label>
          <input id="like" class="favorite__input" type="checkbox" />
        </div>
      </div>
    `
    this.$wrapperCard.innerHTML = card
    this._stateLikesListener()
    return this.$wrapperCard
  }
}