const modalContact = document.querySelector('#contact-modal')
const btnModalContactOpen = document.querySelector('[aria-controls="contact-modal"]')
const btnModalContactClose = document.querySelector('[data-dismiss="contact-modal"]')

const modal = new Modal(modalContact, btnModalContactClose)

btnModalContactOpen.addEventListener('click', () => {
  modal.displayModal()
})