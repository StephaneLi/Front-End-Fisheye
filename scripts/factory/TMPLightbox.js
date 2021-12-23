  // Lightbox
  /**
   * @property {HTMLElement} element
   * @property {string[]} gallery
   * @property {string} url
   */
  class Lightbox {
    /**
     * @param {string} url
     * @param {string[]} gallery
     */
    constructor(url, gallery) {
      this._element = this.buildDOM(url)
      this._gallery = gallery

      // SUPPRESSION DES DOUBLONS A SUPPRIMER RECONSTRUCTION CLASS
      this._gallery = [...new Set(this._gallery)]
      //

      this._url = null
      this._loadImage(url)

      this._onKeyUp = this._onKeyUp.bind(this)

      document.body.appendChild(this._element)
      document.addEventListener('keydown', this._onKeyUp)
    }

    /**
    * @param {string} url 
    */
    _loadImage (url) {
      const image = new Image();
      const container = this._element.querySelector('.lightbox__container__content')
      const loader = document.createElement('div')

      image.src = url
      loader.classList.add('lightbox__loader')
      container.innerHTML = ''
      container.appendChild(loader)

      image.onload = () => {
        container.removeChild(loader)
        container.appendChild(image)
        this._url = url
      }
    }

    /**
     * @param {string} url 
     * @return {HTMLElement}
     */
    buildDOM (url) {
      const template = document.createElement('aside')
      template.classList.add('lightbox')

      const content = `
        <button class="lightbox__close material-icons">close</button>
        <button class="lightbox__next material-icons">arrow_forward_ios</button>
        <button class="lightbox__prev material-icons">arrow_back_ios</button>
        <div class="lightbox__container">
          <div class="lightbox__container__content"></div>             
        </div>
      `

      template.innerHTML = content

      template.querySelector('.lightbox__close').addEventListener('click', this._close.bind(this))
      template.querySelector('.lightbox__next').addEventListener('click', this._next.bind(this))
      template.querySelector('.lightbox__prev').addEventListener('click', this._prev.bind(this))

      return template
    }

    /**
     * Passe à l'élément suivant
     * @param {MouseEvent|KeyboardEvent} e 
     */
    _next(e) {
      e.preventDefault()
      let i = this._gallery.findIndex(image => image === this._url)

      if(i === this._gallery.length - 1) {
        i = -1
      }

      this._loadImage(this._gallery[i + 1])      
    }

    /**
    * Passe à l'élément suivant
    * @param {MouseEvent|KeyboardEvent} e 
    */
    _prev(e) {
      e.preventDefault()
      let i = this._gallery.findIndex(image => image === this._url)

      if(i === 0) {
        i = this._gallery.length - 1
      }

      this._loadImage(this._gallery[i - 1])  
    }

    /**
     * Ferme la lightbox
     * @param {MouseEvent|KeyboardEvent} e 
     */
    _close (e) {
      e.preventDefault()
      this._element.classList.add('fadeout')
      const timer = setTimeout(() => {
        this._element.parentNode.removeChild(this._element)        
        clearTimeout(timer)
      }, 500)
      document.removeEventListener('keydown', this._onKeyUp)
    }

    /**
     * Navigation avec le Clavier
     * @param {KeyboardEvent} e 
     */
    _onKeyUp (e) {
      if(e.key === 'Escape' || e.key === 'Esc') {
        this._close(e)
      }
      if(e.key === 'ArrowLeft') {
        this._prev(e)
      }
      if(e.key === 'ArrowRight') {
        this._next(e)
      }
    }

    /**
     * @param {Photographer} photographer 
     */
    static init(photographer) {
      const mediaCardsLinks = Array.from(photographer.templatePortfolio.mediasHtmlElement.querySelectorAll('a'))
      const gallery = mediaCardsLinks.map(link => link.getAttribute('href'))
      mediaCardsLinks.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault()
          new Lightbox(e.currentTarget.getAttribute('href'), gallery)
        })
      })
    }
  }

  Lightbox.init(photographer)