// TEMPLATE CARD : Génère le contenu HTML de la Card 
export default class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer
  }

  createPhotographerCard () {
    const $wrapper = document.createElement('li')

    const card = `      
      <article class="photographer">
        <a href="/photographer.html?id=${this._photographer.id}" aria-label="${this._photographer.name}">
          <div class="photographer__cover">
            <img width="100" height="auto" src="${this._photographer.portrait}" alt="${this._photographer.name}" />
          </div>        
          <h2 class="photographer__title">${this._photographer.name}</h2>        
        </a>
          <ul class="photographer__infos">
            <li class="photographer__infos__local text--primary">${this._photographer.city}, ${this._photographer.country}</li>
            <li class="photographer__infos__tagline">${this._photographer.tagline}</li>
            <li class="photographer__infos__price text--grey">${this._photographer.price}€/jour</li>
          </ul>
      </article>      
    `

    $wrapper.innerHTML = card
    return $wrapper
  }
}