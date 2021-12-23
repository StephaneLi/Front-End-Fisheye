export default class FilterSelect {
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
    this._expand = false

    this._ariaEventListener = this._ariaEventListener.bind(this)
    this._expandListener = this._expandListener.bind(this)
    this._expandMenu = this._expandMenu.bind(this)
    this._unexpandMenu = this._unexpandMenu.bind(this)

    this.filterPortfolio()
    this._expandListener()
  }

  get value() {
    return this._value
  }

  /**
   * @param {FilterSelectTemplate} template 
   * @param {Photographer} photographer 
   */
  static init(template, photographer) {
    new FilterSelect(template, photographer)
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
    // click sur bouton expand
    this._expandButton.addEventListener('click', (e) => {  
      e.preventDefault()
      e.stopPropagation()      
      this._selector.classList.toggle('active')
      // Appliquer height pour etendre le menu
      if (!this._expand){
        this._expandMenu()
      } else {
        this._unexpandMenu()
        this._expandButton.focus()
      }
    })

    // click sur le selecteur
    this._selector.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (!this._expand){
        this._expandMenu()         
      }
    })
    
    // click sur une option
    this._selectorItems.forEach(item => {      
      item.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()  
        if (this._expand){  
         this._selectItem(e.target)
        }
      })      
    })

    // Espace sur bouton
    this._expandButton.addEventListener('keydown', (e) => {
      if (e.keyCode === 32 && !this._expand) {
        this._expandMenu() 
      }
    })
  }

  _expandMenu () {
    this._expand = true
    this._expandButton.setAttribute('aria-expanded', true)
    this._selector.style.height = this._expandHeight
    this._selector.classList.add('active')
    this._selectorItems[0].focus()
    this._selector.addEventListener('keydown', this._ariaEventListener)
    document.addEventListener('click', this._unexpandMenu)
  }

  _unexpandMenu () {
    this._expand = false
    this._expandButton.setAttribute('aria-expanded', false)
    this._selector.style.height = ''
    this._selector.classList.remove('active')
    this._selector.removeEventListener('keydown', this._ariaEventListener)
    document.removeEventListener('click', this._unexpandMenu)
  }

  /**
   * @param {HTMLElement} node 
   */
  _selectItem (node) {
    this._selectedItem = node
    this._value = node.dataset.filterOption

    this.filterPortfolio()

    // Trie le tableau d'élément
    this._selectorItems = this._selectorItems.filter(item => item != node)
    this._selectorItems.unshift(node)

    
    // Affecte la class en fonction de la position de l'element dans le tableau
    let i = 1;
    this._selectorItems.forEach(item => {
      item.className = 'selector__item'
      item.classList.add(`selector__item--${i}`)
      item.removeAttribute('aria-selected')
      if(item === this._selectedItem) {
        item.classList.add(`selected`)
        item.setAttribute('aria-selected', true)
      }
      i++
    })

    this._unexpandMenu()
  }

  _ariaEventListener (e) {
    e.preventDefault()

    // Appuie sur echap, fermer le selecteur
    if (e.key === 'Escape' || e.key === 'Esc') {
      this._unexpandMenu()
      this._expandButton.focus()
    }

    // Appuie sur entrer, selectionne un element s'il est different de celui selectionné
    // Sinon fermer le selecteur
    if (e.key === 'Enter') {
      if(this._selector.querySelector(':focus') !== this._selectedItem) {
        this._selectItem(this._selector.querySelector(':focus'))
        this._expandButton.focus()
      } else {
        this._unexpandMenu()
        this._expandButton.focus()
      }
    }

    if(e.key === 'Tab') {
      this._unexpandMenu()
      this._expandButton.focus()
    }

    // Appuie sur fleche haut fleche bas, navigue entre les options
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      // Recupere l'element qui est focus dans la modal
      let index = this._selectorItems.findIndex(elmnt => elmnt === this._selector.querySelector(':focus'))

      // Incerment ou Decrement ( TAB || Shift+TAB )
      if(e.key === 'ArrowUp') {
        index--
      } else {
        index++
      }

      // Lors du Tab il passe a l'index suivant
      if(index >= this._selectorItems.length) {
        index = 0
      }
      if(index < 0) {
        index = this._selectorItems.length -1
      }

      this._selectorItems[index].focus()
    }
  }
}