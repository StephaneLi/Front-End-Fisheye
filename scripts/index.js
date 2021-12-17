import "../scss/style_index.scss"

import Api from './api/api'
import PhotographerFactory from './factories/photographerFactory'
import PhotographerCard from './templates/photographerCard'

async function init() {
  // Node HTML dans lequel on insert la list des photographes
  const $photographersWrapper = document.querySelector('#photographer_section')

  // Instance de la Class API
  const data = new Api('/data/photographers.json')

  // Récupère les datas des photographes
  const photographers = await data.getPhotographers();
  const tabPhotographers = []

  // Création des objets photographer et insertion dans un tableau
  photographers.forEach(element => {
    const photographer = new PhotographerFactory(element, 'type1')
    tabPhotographers.push(photographer)
  })

  // Creation des Card et insertion dans le DOM
  tabPhotographers.forEach(element => {
    const photographerCard = new PhotographerCard(element)
    $photographersWrapper.appendChild(photographerCard.createPhotographerCard())
  })

  //test 
  const test = await data.getPortfolioByUserId(82);
};

init();