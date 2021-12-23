import "../scss/style_index.scss"

import Api from './api/api'
import Photographer from './models/photographer'
import PhotographerTemplate from './factory/photographerTemplate'

async function init() {
  // Node HTML dans lequel on insert la list des photographes
  const $photographersWrapper = document.querySelector('#photographer_section')

  // Instance de la Class API
  const data = new Api('data/photographers_new.json')

  // Récupère les datas des photographes
  const photographers = await data.getPhotographers();
  const tabPhotographers = []

  // Création des objets photographer et insertion dans un tableau
  photographers.forEach(element => {
    const photographer = new Photographer(element, 'type1')
    tabPhotographers.push(photographer)
  })

  // Creation des Card et insertion dans le DOM
  tabPhotographers.forEach(element => {
    const photographerTemplate = new PhotographerTemplate(element)
    $photographersWrapper.appendChild(photographerTemplate.createPhotographerCard())
  })
};

init();