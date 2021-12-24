import LightboxTemplate from '../factory/lightBoxTemplate'

export default class Lightbox {
  /**
   * @param {Photographer} photographer
   * @param {Media} media
   */
  constructor (photographer, media) {
    this._media = media
    this._photographer = photographer
    this._template = new LightboxTemplate(this._media)

    // Garde les fonctions dans le context de l'objet
    this._onKeyUp = this._onKeyUp.bind(this)
    this._close = this._close.bind(this)
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
  }

  /**
   * Init LigthBox
   */
  init () {
    // Insertion de la lightbox dans le DOM
    document.body.appendChild(this._template.createLightBox())
    document.addEventListener('keydown', this._onKeyUp)
    this._template.closeButton.addEventListener('click', this._close)
    this._template.nextButton.addEventListener('click', this._next)
    this._template.prevButton.addEventListener('click', this._prev)
    this._template.loadFactory(this._media)
  }

  /**
    * PRIVATE Passe à l'élément suivant
    * @param {MouseEvent|KeyboardEvent} e
    */
  _next (e) {
    e.preventDefault()
    let i = this._photographer.portfolio.findIndex(media => media.id === this._media.id)

    if (i === this._photographer.portfolio.length - 1) {
      i = -1
    }

    this._media = this._photographer.portfolio[i + 1]
    this._template.loadFactory(this._media)
  }

  /**
  * PRIVATE Passe à l'élément suivant
  * @param {MouseEvent|KeyboardEvent} e
  */
  _prev (e) {
    e.preventDefault()
    let i = this._photographer.portfolio.findIndex(media => media.id === this._media.id)

    if (i === 0) {
      i = this._photographer.portfolio.length
    }

    this._media = this._photographer.portfolio[i - 1]
    this._template.loadFactory(this._media)
  }

  /**
  * PRIVATE Ferme la lightbox
  * @param {MouseEvent|KeyboardEvent} e
  */
  _close (e) {
    e.preventDefault()
    this._template.lightBoxHTMLElement.classList.add('fadeout')
    const timer = setTimeout(() => {
      this._template.lightBoxHTMLElement.parentNode.removeChild(this._template.lightBoxHTMLElement)
      clearTimeout(timer)
    }, 500)
    document.removeEventListener('keydown', this._onKeyUp)
  }

  /**
  * PRIVATE Navigation avec le Clavier
  * @param {KeyboardEvent} e
  */
  _onKeyUp (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this._close(e)
    }
    if (e.key === 'ArrowLeft') {
      this._prev(e)
    }
    if (e.key === 'ArrowRight') {
      this._next(e)
    }
  }
}
