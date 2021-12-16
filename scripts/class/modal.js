class Modal {
  /**
   * @param {HTMLElement} node 
   * @param {String} ariaSelector 
   */
  constructor (node, closeNode = null, ariaSelector = 'button, a, input, textarea, [role="button"]') {
    this._node = node
    this._closeNode = closeNode 
    this._ariaSelector = ariaSelector
    this._previousFocus = null
    this._modalDisplay = null
    this._ariaElements = []

    // Bind des fonctions pour garder le context this
    this._stopPropagation = this._stopPropagation.bind(this)
    this._ariaModal = this._ariaModal.bind(this)
    this._closeModal = this.closeModal.bind(this)
    this._displayModal = this.displayModal.bind(this)

    // Cache l'element modal par default
    this._node.style.display = "none"

    // Si la modal a un bouton de fermture on ajoute l'evenement
    if (closeNode) {
      closeNode.addEventListener('click', this._closeModal)
    }
  }

  getElement() {
    return this._node
  }

  getPreviousFocus() {
    return this._previousFocus
  }

  /**
   * Affiche la boite modal
   */
  displayModal () {
    // Initialise l'Element HTML
    this._node.style.display = null
    this._node.removeAttribute('aria-hidden')
    this._node.setAttribute('aria-modal', true)

    // Memorise le precedent element focus
    this._previousFocus = document.querySelector(':focus')

    // Recupération de tous les elements qui intéragissent avec tab (focus)
    this._ariaElements = Array.from(this._node.querySelectorAll(this._ariaSelector))

    // ferme la modal si on click sur son arriere plan
    this._node.addEventListener('click', this._closeModal)

    // stop la propagation des evenement si je click sur la modal
    this._node.querySelector('[data-stop-propagation]').addEventListener('click', this._stopPropagation)

    // ecoute les evenement au clavier pour fermer la modal
    window.addEventListener('keydown', this._ariaModal)

    this._modalDisplay = true
  }

  /**
   * Ferme la boite modal
   */
  closeModal () {
    // Focus sur l'element avant l'ouverture de la modal
    if(this._previousFocus !== null) this._previousFocus.focus()

    // change les attributs aria et style
    this._node.style.display = "none"
    this._node.setAttribute('aria-hidden', true) 
    this._node.removeAttribute('aria-modal')

    // Suppression des listeners present lors de l'ouverture de la modal
    this._node.removeEventListener('click', this._closeModal)
    this._node.querySelector('[data-stop-propagation]').removeEventListener('click', this._stopPropagation)
    window.removeEventListener('keydown', this._ariaModal)

    this._modalDisplay = false
  }

  /**
   * Stop la propagation des evenements
   * @param {Event} e 
   */
  _stopPropagation (e) {
    e.stopPropagation()
  }

  /**
   * Rendre la model accessible & Control aria tab
   * @param {*} e 
   */
  _ariaModal(e) {
    e.preventDefault()

    // Si on appuie sur echap on ferme la modal
    if (e.key === 'Escape' || e.key === 'Esc') {
      this._closeModal()
    }
    // Si l'element focus est le bouton close et que la touche est enter on ferme la modal
    if ( this._node.querySelector(':focus') === this._closeNode && e.key === 'Enter' ) {
      this._closeModal()
    }

    if (e.key === 'Tab' && modal !== null) {
      this._focusInModal(e)
    }
  }

  _focusInModal (e) {
    e.preventDefault()
    
    // Recupere l'element qui est focus dans la modal
    let index = this._ariaElements.findIndex(elmnt => elmnt === this._node.querySelector(':focus'))
    
    // Incerment ou Decrement ( TAB || Shift+TAB )
    if(e.shiftKey === true) {
      index--
    } else {
      index++
    }
    // Lors du Tab il passe a l'index suivant
    if(index >= this._ariaElements.length) {
      index = 0
    }
    if(index < 0) {
      index = this._ariaElements.length -1
    }

    this._ariaElements[index].focus()
  }
}