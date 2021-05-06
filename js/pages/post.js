import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import { findPostById } from "../data/dataFromApi.js";

addHeaderForPage(pageNames.POST);
addFooterForPage();

const postId = new URLSearchParams(location.search).get("id");

const postToHtml = (post) => {
  const { dateString, title, content} = post;

  return /*template*/`
    <div>
      <p class="date">${dateString}</p>
      <h2>${title}</h2>
      ${content}
    </div>
  `;
};

const resizeIframes = () => {
  document.querySelectorAll("main iframe").forEach(iframe => {
    const figureWidth = iframe.closest("figure").offsetWidth;
    const { width, height } = iframe;

    const newHeight = height / width * figureWidth;
    iframe.width = figureWidth;
    iframe.height = newHeight;
  });
}

const addPostToHtml = (post) => {
  document.querySelector("main").insertAdjacentHTML("afterBegin", postToHtml(post));
  resizeIframes();
};

findPostById(postId).then(addPostToHtml);