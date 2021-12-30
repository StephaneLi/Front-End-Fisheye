/**
 * Template Modal contact
 * @property {HTMLElement} modalHtmlElement
 * @property {HTMLElement} closeButtonHtmlElement
 * @property {HTMLElement} sendButtonHtmlElement
 */
export default class ModalTemplate {
  /**
   * @param {Photographer} photographer
   */
  constructor (photographer) {
    this._photographer = photographer
    this.$wrapperModal = null
  }

  /**
   * GETTERS
   */
  get modalHtmlElement () {
    return this.$wrapperModal
  }

  get closeButtonHtmlElement () {
    return this.$wrapperModal.querySelector('[data-dismiss="contact-modal"]')
  }

  get sendButtonHtmlElement () {
    return this.$wrapperModal.querySelector('button[type="submit"]')
  }

  /**
   * Template Modal HTML
   * @returns {HTMLElement}
   */
  createContactModal () {
    this.$wrapperModal = document.createElement('div')
    this.$wrapperModal.id = 'contact-modal'
    this.$wrapperModal.style.display = 'none'
    this.$wrapperModal.setAttribute('role', 'dialog')
    this.$wrapperModal.setAttribute('aria-labelledby', 'contact-modal__title')
    this.$wrapperModal.setAttribute('aria-hidden', 'true')
    this.$wrapperModal.setAttribute('tabindex', '-1')

    const content = `
      <div class="modal" role="document" data-stop-propagation>
        <header>
          <h2 id="contact-modal__title" tabindex="0">Contactez-moi<br />${this._photographer.name}</h2>
          <span class="material-icons button__close" role="button" aria-label="Fermer le formulaire de contact" data-dismiss="contact-modal" tabindex="0">close</span>
        </header>
        <form action="#" method="post">
          <div>
            <label id="label-form-firstname"  tabindex="0" for="form-firstname">Prénom</label>
            <input type="text" name="firstname" id="form-firstname" aria-labelledby="label-form-firstname" required minlength="2"/>
          </div>
          <div>
            <label id="label-form-lastname"  tabindex="0" for="form-lastname">Nom</label>
            <input type="text" name="lastname" id="form-lastname" aria-labelledby="label-form-lastname" required minlength="2"/>
          </div>
          <div>
            <label id="label-form-email"  tabindex="0" for="form-email">Email</label>
            <input type="email" name="email" id="form-email" aria-labelledby="label-form-email" required/>
          </div>
          <div>
            <label id="label-form-message"  tabindex="0" for="form-message">Votre message</label>
            <textarea name="message" id="form-message" rows="5" placeholder=" " aria-labelledby="label-form-message" required minlength="10"></textarea>
          </div>
          <button class="button" type="submit" aria-label="Envoyer le message" >Envoyer</button>
        </form>
      </div>
    `

    this.$wrapperModal.innerHTML = content
    return this.$wrapperModal
  }
}
