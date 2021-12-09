// TEMPLATE CARD : Génère le contenu HTML de la Card 
class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer
  }

  createPhotographerCard () {
    const $wrapper = document.createElement('li')

    const card = `      
      <article class="photographer-card">
        <a href="/photographer.html?id=${this._photographer.id}">
          <div class="photographer-card__cover">
            <img src="${this._photographer.portrait}" alt="${this._photographer.name}" />
          </div>
          <h2 class="photographer-card__title">${this._photographer.name}</h2>
          <ul class="photographer-card__infos">
            <li class="photographer-card__infos__local">${this._photographer.city}, ${this._photographer.country}</li>
            <li class="photographer-card__infos__tagline">${this._photographer.tagline}</li>
            <li class="photographer-card__infos__price">${this._photographer.price}€/jour</li>
          </ul>
        </a>
      </article>      
    `

    $wrapper.innerHTML = card
    return $wrapper
  }
}