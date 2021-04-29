import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import { findPostById } from "../data/dataFromApi.js";

addHeaderForPage(pageNames.POST);
addFooterForPage();

const postId = new URLSearchParams(location.search).get("id");

const postToHtml = (post) => {
  const { id, dateString, title, content} = post;

  return /*template*/`
    <div>
      <p>${dateString}</p>
      <h2>${title}</h2>
      ${content}
    </div>
  `;
};

const addPostToHtml = (post) => {
  document.querySelector("main").insertAdjacentHTML("afterBegin", postToHtml(post));
};

findPostById(postId).then(addPostToHtml);