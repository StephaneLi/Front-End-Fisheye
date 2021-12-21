export class FilterSelect {
  /**
   * @param {FilterSelectTemplate} template 
   * @param {Photographer} photographer 
   */
  constructor(template, photographer) {
    this._expandButton = template.filterHtmlElement.querySelector('[aria-expanded]')
    this._selector = template.filterHtmlElement.querySelector('.selector')
    this._photographer = photographer
    this._selectorItems = Array.from(this._selector.querySelectorAll('.selector__item'))
    this._selectedItem =  this._selectorItems[0]
    this._value = this._selectorItems[0].dataset.filterOption
    this._expandHeight = this._selectedItem.clientHeight * this._selectorItems.length - 2 + 'px'

    this.filterPortfolio()
    this._expandListener()
  }

  get value() {
    return this._value
  }

  filterPortfolio () {
    this._selector.dataset.filterValue = this._value
    switch (this._value) {
      case 'popularity':        
        this._photographer.portfolio.sort((a, b) => b.likes - a.likes )
        break

      case 'date':
         this._photographer.portfolio.sort((a, b) => b.date - a.date )
        break

      case 'title':
        this._photographer.portfolio.sort((a, b) => {
          if (b.title > a.title) {
            return -1
          }
          if (a.title > b.title) {
            return 1
          }
          return 0
        })
        break
    }    
  }

  _expandListener () {
    this._expandButton.addEventListener('click', (e) => {  
      e.preventDefault()
      e.stopPropagation()      
      this._selector.classList.toggle('active')
      // Appliquer height pour etendre le menu
      if (this._selector.classList.contains('active')){
        this._expandMenu()
      } else {
        this._unexpandMenu()
      }
    })

    this._selector.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (!this._selector.classList.contains('active')){
        this._expandMenu()         
      }
    })

    this._selectorItems.forEach(item => {      
      item.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()    
        if (this._selector.classList.contains('active')){
          this._selectedItem = e.target
          this._value = e.target.dataset.filterOption

          this.filterPortfolio()

          // Trie le tableau d'élément
          this._selectorItems = this._selectorItems.filter(item => item != e.target)
          this._selectorItems.unshift(e.target)

          
          // Affecte la class en fonction de la position de l'element dans le tableau
          let i = 1;
          this._selectorItems.forEach(item => {
            item.className = 'selector__item'
            item.classList.add(`selector__item--${i}`)
            if(item === this._selectedItem) {
              item.classList.add(`selected`)
            }
            i++
          })

          this._unexpandMenu()
        }  
      })      
    })
  }

  _expandMenu () {
    this._selector.setAttribute('aria-expand', true)
    this._selector.style.height = this._expandHeight
    this._selector.classList.add('active')
  }

  _unexpandMenu () {
    this._selector.setAttribute('aria-expand', false)
    this._selector.style.height = ''
    this._selector.classList.remove('active')
  }
}