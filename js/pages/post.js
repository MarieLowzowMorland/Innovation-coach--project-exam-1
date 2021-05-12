import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import { findPostById } from "../data/dataFromApi.js";
import modal from "../components/modal.js";

addHeaderForPage(pageNames.POST);
addFooterForPage();

const postId = new URLSearchParams(location.search).get("id");

const postToHtml = (post) => {
  const { dateString, title, content, summary, featuredImage} = post;
  const { alt_text, src} = featuredImage;

  return /*template*/`
    <div>
      <div class="reverse-column-order">
        <h1>${title}</h1>
        <p class="date">${dateString}</p>
      </div>
      <div class="summary">
        ${summary}
        <figure class="wp-block-image">
          <img alt="${alt_text}" src="${src}"/>
        </figure>
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
};

const mediaTextModal = (event) => {
  const element = event.target.closest(".wp-block-media-text");
  const { alt, src } = element.querySelector("img");
  const captionElement = element.querySelector(".wp-block-media-text__content");
  const caption = captionElement ? captionElement.innerHTML : "";
  modal(src, alt, caption);
};

const clickableImage = (element, callback) => {
  element.setAttribute("tabindex", 0);
  element.setAttribute("role", "button");
  const alt = element.getAttribute("alt");
  element.setAttribute("aria-label", `Click to expand image: ${alt}`);

  element.addEventListener("click", callback);
  element.addEventListener("keydown", (event) => {
    const spacePressed = event.key === " " || event.keyCode === 32;
    const enterPressed = event.key === "Enter" || event.keyCode === 13;
    if( spacePressed || enterPressed ){
      event.preventDefault();
      callback(event);
    }
  })
};

const addImageEvents = () => {
  document
    .querySelectorAll(".wp-block-image img")
    .forEach(image => clickableImage(image, imageModal));
    
  document
    .querySelectorAll(".wp-block-media-text img")
    .forEach(mediaText => clickableImage(mediaText, mediaTextModal));
};

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
};

const addPostToHtml = (post) => {
  document.querySelector("main").classList.remove("loading");
  document.getElementById("loader").remove();
  document.querySelector("main").insertAdjacentHTML("afterBegin", postToHtml(post));
  document.title = `${post.title} | Innovation Coach`
  resizeIframes();
  addImageEvents();
};

findPostById(postId).then(addPostToHtml);