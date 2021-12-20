import "../scss/style_profil.scss"

import Api from './api/api'
import Modal from './class/modal'
import Photographer from "./models/photographer"
import {Video, Picture} from './models/media'
import PhotographerTemplate from './templates/photographerTemplate'
import ContactModalTemplate from './templates/contactModalTemplate'
import {ListMediaTemplate } from './templates/mediaTemplate'

async function init() {
  const $photographersWrapper = document.querySelector('#profil')
  const $portfolioWrapper = document.querySelector('#portfolio')

  // Instance de la Class API
  const data = new Api('data/photographers.json')

  // Recupération paramètres url
  const queryString = window.location.search
  const urlParams = new URLSearchParams (queryString)
  const userId = parseInt(urlParams.get('id'))

  // Récupère les datas des photographes
  const photographerData = await data.getPhotographerById(userId);
  const portfolioData = await data.getPortfolioByUserId(userId);

  // Creation du photographe et de son portfolio
  const photographer = new Photographer(photographerData)
  portfolioData.forEach(mediaData => {
    if(mediaData.image) {
      photographer.addPortfolioMedia(new Picture(mediaData, photographer))
    } else if(mediaData.video) {
      photographer.addPortfolioMedia(new Video(mediaData, photographer))
    }    
  })

  // Creation du header profil & link profil et insertion dans le DOM
  const photographerTemplate = new PhotographerTemplate(photographer)
  $photographersWrapper.appendChild(photographerTemplate.createPhotographerContentLink())
  $photographersWrapper.appendChild(photographerTemplate.createPhotographerHeader())
  photographer.template = photographerTemplate

  //Creation du portfolio et insertion dans le DOM
  const portfolioTemplate = new ListMediaTemplate(photographer)
  $portfolioWrapper.appendChild(portfolioTemplate.createListMedia())

  // Creation de la modal de contact et insertion dans le DOM
  const contactModalTemplate = new ContactModalTemplate(photographer)
  $photographersWrapper.appendChild(contactModalTemplate.createContactModal())

  // Creation de l'objet Modal
  const modal = new Modal(contactModalTemplate.modalHtmlElement, contactModalTemplate.closeButtonHtmlElement)

  // Listeners pour la Modal
  const btnModalContactOpen = document.querySelector('[aria-controls="contact-modal"]')
  btnModalContactOpen.addEventListener('click', () => {
    modal.displayModal()
  })
}

init()