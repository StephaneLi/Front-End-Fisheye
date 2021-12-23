import "../scss/style_profil.scss"

import Api from './api/api'
import Photographer from "./models/photographer"
import { Video, Picture } from './models/media'
import PhotographerTemplate from './factory/photographerTemplate'
import ContactModalTemplate from './factory/contactModalTemplate'
import ListMediaTemplate from './factory/mediaTemplate'
import FilterSelectTemplate from "./factory/filterSelectTemplate"
import Modal from './controller/modal'
import FilterSelect from "./controller/filterSelect"


async function init() {
  const $photographersWrapper = document.querySelector('#profil')
  const $portfolioWrapper = document.querySelector('#portfolio')
  const $filterWrapper = document.querySelector("#filter")
  const listMedia = []

  // Instance de la Class API
  const data = new Api('data/photographers_new.json')

  // Recupération paramètres url
  const queryString = window.location.search
  const urlParams = new URLSearchParams (queryString)
  const userId = parseInt(urlParams.get('id'))

  // Récupère les datas des photographes
  const photographerData = await data.getPhotographerById(userId);
  const portfolioData = await data.getPortfolioByUserId(userId);

  // List des médias du photograhe
  portfolioData.forEach(mediaData => {
    if(mediaData.image) {
      listMedia.push(new Picture(mediaData, photographer))
    } else if(mediaData.video) {
      listMedia.push(new Video(mediaData, photographer))
    }    
  })

  // Creation de l'objet photographe
  const photographer = new Photographer(photographerData)
  photographer.portfolio = listMedia
  photographer.templatePhotographer = new PhotographerTemplate(photographer)
  photographer.templatePortfolio = new ListMediaTemplate(photographer)
  photographer.templateModal = new ContactModalTemplate(photographer)
  photographer.templateFilter = new FilterSelectTemplate()

  // Insertion des element dans le DOM
  $photographersWrapper.appendChild(photographer.templatePhotographer.createPhotographerHeader())
  $photographersWrapper.appendChild(photographer.templatePhotographer.createPhotographerContentLink())
  $photographersWrapper.appendChild(photographer.templateModal.createContactModal())
  $filterWrapper.appendChild(photographer.templateFilter.createFilter())
  

  // Initialisation des controllers
  const modal = new Modal(photographer.templateModal)
  photographer.templatePhotographer.btnModal.addEventListener('click', () => modal.displayModal())

  const filter = new FilterSelect(photographer.templateFilter, photographer)

  // Insertion du portfolio après application du filtre par default
  $portfolioWrapper.appendChild(photographer.templatePortfolio.createListMedia())
  $portfolioWrapper.classList.add('loaded')

  // Observeur pour rafraichier les element du DOM filtré
  const targetNode = photographer.templateFilter.observerNode;
  const config = { attributes: true, attributeFilter: ['data-filter-value'], };
  const observer = new MutationObserver( function () {
    photographer.templatePortfolio.refreshListMedia()
  })
  observer.observe(targetNode, config);

  // Lightbox
  /**
   * @property {HTMLElement} element
   */
  class Lightbox {
    /**
     * @param {string} url URL de l'image
     */
    constructor(url) {
      this._element = this.buildDOM(url)
      this._loadImage(url)
      document.body.appendChild(this._element)
    }

    /**
    * @param {string} url 
    */
    _loadImage (url) {
      const image = new Image();
      const container = this._element.querySelector('.lightbox__container')
      const loader = document.createElement('div')

      image.src = url
      loader.classList.add('lightbox__loader')
      container.appendChild(loader)

      image.onload = function() {
        container.removeChild(loader)
        container.appendChild(image)
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
          <div class="lightbox__container__content">
            <p>Titre de l'image</p>
          </div>             
        </div>
      `

      template.innerHTML = content

      return template
    }

    /**
     * @param {Photographer} photographer 
     */
    static init(photographer) {
      const mediaCardsLinks = photographer.templatePortfolio.mediasHtmlElement.querySelectorAll('a')
      mediaCardsLinks.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault()
          new Lightbox(e.currentTarget.getAttribute('href'))
        })
      })
    }
  }

  Lightbox.init(photographer)
}

init()