/**
 * Template pour le filtre des images
 * @property {HTMLElement} filterHtmlElement
 * @property {HTMLElemnt} observerNode
 */
export default class FilterSelectTemplate {
  constructor () {
    this.$wrapper = null
    this._observerNode = null
  }

  /**
   * GETTERS
   */
  get filterHtmlElement () {
    return this.$wrapper
  }

  get observerNode () {
    return this._observerNode
  }

  /**
    * @returns {HtmlElement}
    */
  createFilter () {
    this.$wrapper = document.createElement('div')
    this.$wrapper.classList.add('filter-selector')

    const content = `         
      <h3 id="filter__title">Trier par</h3>
      <div class="selector" data-filter-value="popularity">
        <button id="filter__toggle" class="selector__toggle" aria-expanded="false" aria-haspopup="listbox"><span class="material-icons">expand_more</span></button>
        <ul role="listbox" aria-label="filtrer" class="selector__list" tabindex="-1" aria-activedescendant="filter__option1" >
          <li id="filter__option1" role="option" class="selector__item selector__item--1" tabindex="-1" data-filter-option="popularity" aria-labelledby="filter__title" aria-selected="true">Popularité</li>
          <li id="filter__option2" role="option" class="selector__item selector__item--2" tabindex="-1" data-filter-option="date" aria-labelledby="filter__title">Date</li>
          <li id="filter__option3" role="option" class="selector__item selector__item--3" tabindex="-1" data-filter-option="title" aria-labelledby="filter__title">Titre</li>
        </ul>
      </div>
    `
    this.$wrapper.innerHTML = content
    this._observerNode = this.$wrapper.querySelector('.selector')
    return this.$wrapper
  }
}
