import { Remove } from '../templates/svgIcons.js';

const modalWrapperId = "modal-wrapper";
const modalTemplate = (imageSrc, imageAltText, caption) => /*template*/`
  <div id="${modalWrapperId}" role="dialog">
    <div id="overlay"></div>
    <div class="modal">
      <button id="close-modal" class="discrete-button" aria-label="Close modal">${Remove()}</button>
      <figure class="modal-image">
        <img src="${imageSrc}" alt="${imageAltText}" />
        <figcaption>${caption}</figcaption>
      </figure>
    </div>
  </div>`;

const closeModal = (event) => {
  if(event){
    event.preventDefault();
    event.stopPropagation();
  }

  const existingModal = document.getElementById(modalWrapperId);
  if(existingModal){
    existingModal.remove();
    document.removeEventListener('keydown', trapFocusInsideModal);
    document.querySelectorAll("header, main, footer")
      .forEach(landmark => landmark.removeAttribute("aria-hidden"));
  }
}

const focusModalButton = () => document
  .getElementById(modalWrapperId)
  .querySelector("button")
  .focus();

const trapFocusInsideModal = (event) => {
  const tabPressed = event.key === 'Tab' || event.keyCode === 9;
  const escPressed = event.key === 'Escape' || event.keyCode === 27;
  if( tabPressed ) {
    event.preventDefault();
    focusModalButton();
  } else if ( escPressed ) {
    event.preventDefault();
    closeModal(event);
  }
} 

const modal = (imageSrc, imageAltText, caption) => {
  closeModal();
  document.querySelector("main")
    .insertAdjacentHTML("beforebegin", modalTemplate(imageSrc, imageAltText, caption));

  document.getElementById("overlay").addEventListener("click", closeModal);
  document.getElementById("close-modal").addEventListener("click", closeModal);
  document.addEventListener('keydown', trapFocusInsideModal);

  document.querySelectorAll("header, main, footer")
    .forEach(landmark => landmark.setAttribute("aria-hidden", true));
  focusModalButton();
}

export default modal;