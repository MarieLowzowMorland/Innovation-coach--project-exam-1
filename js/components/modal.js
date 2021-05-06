import { Remove } from '../templates/svgIcons.js';

const modalTemplate = (imageSrc, imageAltText, caption) => /*template*/`
  <div class="modal-wrapper">
    <div id="overlay"></div>
    <div class="modal">
      <button id="close-modal" class="discrete-button">${Remove()}</button>
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

  const existingModal = document.querySelector("main .modal-wrapper");
  if(existingModal){
    existingModal.remove();
  }
}

const modal = (imageSrc, imageAltText, caption) => {
  closeModal();
  document.querySelector("main")
    .insertAdjacentHTML("afterbegin", modalTemplate(imageSrc, imageAltText, caption));

  document.getElementById("overlay").addEventListener("click", closeModal);
  document.getElementById("close-modal").addEventListener("click", closeModal);
}

export default modal;