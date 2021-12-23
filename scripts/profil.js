import "../scss/style_profil.scss"

import Api from './api/api'
import Photographer from "./models/photographer"
import { Video, Picture } from './models/media'
import PhotographerTemplate from './factory/photographerTemplate'
import ModalTemplate from './factory/modalTemplate'
import ListMediaTemplate from './factory/mediaTemplate'
import FilterSelectTemplate from "./factory/filterSelectTemplate"
import Modal from './controller/modal'
import FilterSelect from "./controller/filterSelect"
import Lightbox from "./controller/lightbox"


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
      listMedia.push(new Picture(mediaData))
    } else if(mediaData.video) {
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
  Modal.init(photographer.templateModal, photographer)
  FilterSelect.init(photographer.templateFilter, photographer)

  // Insertion du portfolio après application du filtre par default
  $portfolioWrapper.appendChild(photographer.templatePortfolio.createListMedia())
  $portfolioWrapper.classList.add('loaded')

  // init lightbox
  Lightbox.init(photographer)


  // Observeur pour rafraichier les element du DOM filtré
  const targetNode = photographer.templateFilter.observerNode;
  const config = { attributes: true, attributeFilter: ['data-filter-value'], };
  const observer = new MutationObserver( () => {
    photographer.templatePortfolio.refreshListMedia(() => {
      Lightbox.init(photographer)
    })
  })
  observer.observe(targetNode, config);
}

init()