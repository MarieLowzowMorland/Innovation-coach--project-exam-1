import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import { findPostById } from "../data/dataFromApi.js";
import modal from "../components/modal.js";

addHeaderForPage(pageNames.POST);
addFooterForPage();

const postId = new URLSearchParams(location.search).get("id");

const postToHtml = (post) => {
  const { dateString, title, content} = post;

  return /*template*/`
    <div>
      <div class="reverse-column-order">
        <h1>${title}</h1>
        <p class="date">${dateString}</p>
      </div>
      ${content}
    </div>
  `;
};

const imageModal = (event) => {
  const element = event.target.closest("figure");
  const { alt, src } = element.querySelector("img");
  const figcaptionElement = element.querySelector("figcaption");
  const caption = figcaptionElement ? figcaptionElement.innerHTML : "";
  modal(src, alt, caption);
}

const mediaTextModal = (event) => {
  const element = event.target.closest(".wp-block-media-text");
  const { alt, src } = element.querySelector("img");
  const captionElement = element.querySelector(".wp-block-media-text__content");
  const caption = captionElement ? captionElement.innerHTML : "";
  modal(src, alt, caption);
}

const addImageEvents = () => {
  document.querySelectorAll("main .wp-block-image")
    .forEach(image => image.addEventListener("click", imageModal));
  document.querySelectorAll("main .wp-block-media-text")
    .forEach(mediaText => mediaText.addEventListener("click", mediaTextModal));
}

const resizeIframes = () => {
  document.querySelectorAll("main iframe").forEach(iframe => {
    const figureWidth = iframe.closest("figure").offsetWidth;
    const { width, height } = iframe;
    const clientHeight = document.querySelector("html").clientHeight;

    let newHeight = height / width * figureWidth;
    if(newHeight < clientHeight){
      iframe.width = figureWidth;
      iframe.height = newHeight;
    } else {
      newHeight = 0.8 * newHeight;
      const newWidth = width / height * newHeight;
      iframe.width = newWidth;
      iframe.height = newHeight;
    }
  });
}

const addPostToHtml = (post) => {
  document.querySelector("main").insertAdjacentHTML("afterBegin", postToHtml(post));
  resizeIframes();
  addImageEvents();
};

findPostById(postId).then(addPostToHtml);