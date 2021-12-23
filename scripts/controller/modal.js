export default class Modal {
  /**
   * @param {ContactModalTemplate} template 
   * @param {String} ariaSelector 
   */
  constructor (template, ariaSelector = 'button, a, input, textarea, [role="button"]') {
    this._node = template.modalHtmlElement
    this._closeNode = template.closeButtonHtmlElement
    this._sendButton = template.sendButtonHtmlElement
    this._ariaSelector = ariaSelector
    this._previousFocus = null
    this._modalDisplay = null
    this._ariaElements = []

    // Bind des fonctions pour garder le context this
    this._stopPropagation = this._stopPropagation.bind(this)
    this._ariaModal = this._ariaModal.bind(this)
    this._closeModal = this.closeModal.bind(this)
    this._displayModal = this.displayModal.bind(this)
    this._sendEmail = this._sendEmail.bind(this)

    // Cache l'element modal par default
    this._node.style.display = "none"

    // Si la modal a un bouton de fermture on ajoute l'evenement
    if (this._closeNode) {
      this._closeNode.addEventListener('click', this._closeModal)
    }

    this._sendButton.addEventListener('click', (e) => {
      this._sendEmail()
    })
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

    // Ferme la modal si on click sur son arriere plan
    this._node.addEventListener('click', this._closeModal)

    // Stop la propagation des evenement si on click sur la modal
    this._node.querySelector('[data-stop-propagation]').addEventListener('click', this._stopPropagation)

    // Ecoute les evenement au clavier pour fermer la modal
    window.addEventListener('keydown', this._ariaModal)

    this._modalDisplay = true
  }

  /**
   * Ferme la boite modal
   */
  closeModal () {
    // Focus sur l'element avant l'ouverture de la modal
    if(this._previousFocus !== null) this._previousFocus.focus()

    // Change les attributs aria et style
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
    // Si on appuie sur echap on ferme la modal
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault()
      this._closeModal()
    }
    // Si l'element focus est le bouton close et que la touche est enter on ferme la modal
    if ( this._node.querySelector(':focus') === this._closeNode && e.key === 'Enter' ) {
      e.preventDefault()
      this._closeModal()
    }

    if (e.key === 'Tab' && this._node !== null) {
      e.preventDefault()
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

  _sendEmail () {
    const form = this._node.querySelector('form')
    if (form.checkValidity()) {
      const formData = new FormData( form );
      console.log('ENVOI DE L\'EMAIL:')
      console.log('******************')
      console.log('Prenom : ', formData.get('firstname'))
      console.log('Nom : ', formData.get('lastname'))
      console.log('Email : ', formData.get('email'))
      console.log('message : ')
      console.log(formData.get('message'))
      form.reset()
    }
  }
}