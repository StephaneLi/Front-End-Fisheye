export default class FilterSelectTemplate {
  constructor() {
    this.$wrapper = null
    this._observerNode = null
  }

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
      <h3><label id="filter__title" for="filter__toggle">Trier par</label></h3>
      <div class="selector" data-filter-value="popularity">
        <button id="filter__toggle" class="selector__toggle" aria-expanded="false" aria-labelledby="filter__title"><span class="material-icons">expand_more</span></button>
        <ul role="listbox" aria-label="Filtrer" class="selector__list" tabindex="0" aria-activedescendant="filter__option1" >
          <li id="filter__option1" role="option" class="selector__item selector__item--1 selected" data-filter-option="popularity" aria-selected="true">Popularité</li>
          <li id="filter__option2" role="option" class="selector__item selector__item--2" data-filter-option="date">Date</li>
          <li id="filter__option3" role="option" class="selector__item selector__item--3" data-filter-option="title">Titre</li>
        </ul>
      </div>
    `
    
    this.$wrapper.innerHTML = content
    this._observerNode = this.$wrapper.querySelector('.selector')
    return this.$wrapper
  }
}