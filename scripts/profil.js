// Import SCSS
import '../scss/style_profil.scss'

// Import Class JS
import Api from './api/api'
import Photographer from './models/photographer'
import { Video, Picture } from './models/media'
import PhotographerTemplate from './factory/photographerTemplate'
import ModalTemplate from './factory/modalTemplate'
import ListMediaTemplate from './factory/mediaTemplate'
import FilterSelectTemplate from './factory/filterSelectTemplate'
import Modal from './controller/modal'
import FilterSelect from './controller/filterSelect'
import Lightbox from './controller/lightbox'

// Init App
init()

async function init () {
  // Initialise les variables DOM
  const $photographersWrapper = document.querySelector('#profil')
  const $portfolioWrapper = document.querySelector('#portfolio')
  const $filterWrapper = document.querySelector('#filter')
  const listMedia = []

  // Instance de la Class API
  const data = new Api('data/photographers_new.json')

  // Recupération paramètres url
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const userId = parseInt(urlParams.get('id'))

  // Récupère les datas des photographes
  const photographerData = await data.getPhotographerById(userId)
  const portfolioData = await data.getPortfolioByUserId(userId)

  // List des médias du photograhe
  portfolioData.forEach(mediaData => {
    if (mediaData.image) {
      listMedia.push(new Picture(mediaData))
    } else if (mediaData.video) {
      listMedia.push(new Video(mediaData))
    }
  })

  // Creation de l'objet photographe
  const photographer = new Photographer(photographerData)
  photographer.portfolio = listMedia
  photographer.templatePhotographer = new PhotographerTemplate(photographer)
  photographer.templatePortfolio = new ListMediaTemplate(photographer)
  photographer.templateModal = new ModalTemplate(photographer)
  photographer.templateFilter = new FilterSelectTemplate()

  // Insertion des element dans le DOM
  $photographersWrapper.appendChild(photographer.templatePhotographer.createPhotographerHeader())
  $photographersWrapper.appendChild(photographer.templatePhotographer.createPhotographerContentLink())
  $photographersWrapper.appendChild(photographer.templateModal.createContactModal())
  $filterWrapper.appendChild(photographer.templateFilter.createFilter())

  // Initialisation des controllers
  const modal = new Modal(photographer.templateModal)
  const filter = new FilterSelect(photographer.templateFilter, photographer)
  filter.init()
  modal.init(photographer.templatePhotographer.btnModal)

  // Insertion du portfolio après application du filtre par default
  $portfolioWrapper.appendChild(photographer.templatePortfolio.createListMedia())
  $portfolioWrapper.classList.add('loaded')

  // init lightbox
  initLightbox(photographer)

  // Observeur pour rafraichier les element du DOM filtré
  const targetNode = photographer.templateFilter.observerNode
  const config = { attributes: true, attributeFilter: ['data-filter-value'] }
  const observer = new MutationObserver(() => {
    photographer.templatePortfolio.refreshListMedia(() => {
      // Rafraichi la lightbox après avoir effectué un filtre
      initLightbox(photographer)
    })
  })
  observer.observe(targetNode, config)
}

/**
 * Initialise une lightbox a chaque media
 * @param {*} photographer
 */
function initLightbox (photographer) {
  photographer.portfolio.forEach(media => {
    const links = Array.from(media.template.mediaHtmlElement.querySelectorAll('a'))
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        const timer = setTimeout(() => {
          clearTimeout(timer)
        }, 500)
        const lightbox = new Lightbox(photographer, media)
        lightbox.init()
      })
    })
  })
}
