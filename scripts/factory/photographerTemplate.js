export default class PhotographerTemplate {
  /**
   * @param {Photographer} photographer 
   */
  constructor(photographer) {
    this._photographer = photographer
    this.$wrapperCard = null
    this.$wrapperHeader = null
    this.$wrapperLink = null

    this.$buttonModal = null
  }

  get btnModal () {
    return this.$buttonModal
  }

  createPhotographerCard () {
    this.$wrapperCard = document.createElement('li')

    const card = `      
      <article class="photographer">
        <a href="photographer.html?id=${ this._photographer.id }" aria-label="${ this._photographer.name }">
          <div class="photographer__cover">
            <img width="100" height="auto" src="${ this._photographer.portrait }" alt="${ this._photographer.name }" />
          </div>        
          <h2 class="photographer__title">${ this._photographer.name }</h2>        
        </a>
          <ul class="photographer__infos">
            <li class="photographer__infos__local text--primary">${ this._photographer.city }, ${ this._photographer.country }</li>
            <li class="photographer__infos__tagline">${ this._photographer.tagline }</li>
            <li class="photographer__infos__price text--grey">${ this._photographer.price }€/jour</li>
          </ul>
      </article>      
    `

    this.$wrapperCard.innerHTML = card
    return this.$wrapperCard
  }

  createPhotographerHeader () {
    this.$wrapperHeader = document.createElement('div')
    this.$wrapperHeader.classList.add('photographer-header')

    const content = `
      <div class="photographer__content">
        <h1 class="photographer__content__title display-h2">${ this._photographer.name }</h1>
        <p class="photographer__content__description">
          <span class="photographer__content__description__local text--primary">${ this._photographer.city }</span>
          <span class="photographer__content__description__tag text--grey">${ this._photographer.tagline }</span>
        </p>
      </div>
      <div class="photographer__actions">
        <button class="button" aria-label="Contact Me" aria-haspopup="dialog" aria-controls="contact-modal">Contactez-moi</button>
      </div>
      <div class="photographer__cover">
        <img width="100" src="${ this._photographer.portrait }" alt="Mimi Keel">
      </div>
    `

    this.$wrapperHeader.innerHTML = content
    this.$buttonModal = this.$wrapperHeader.querySelector('[aria-controls="contact-modal"]')
    return this.$wrapperHeader
  }

  createPhotographerContentLink () {
    this.$wrapperLink = document.createElement('aside')
    this.$wrapperLink.classList.add('photographer-content-link')

    const content = `
      <div class="photographer-content-link__like">${ this._photographer.likes }</div>
      <div class="photographer-content-link__price">${ this._photographer.price }€ / jour</div>
    `
    this.$wrapperLink.innerHTML = content
    return this.$wrapperLink
  }

  refreshPhotographerContentLink () {
    if(this.$wrapperLink) {
      this.$wrapperLink.querySelector('.photographer-content-link__like').innerHTML = `${ this._photographer.likes }`
      this.$wrapperLink.querySelector('.photographer-content-link__price').innerHTML = `${ this._photographer.price } € / jour`
    } else {
      throw '$wrapperLink not exist yet, createPhotographerContentLink before'
    }
  }
}