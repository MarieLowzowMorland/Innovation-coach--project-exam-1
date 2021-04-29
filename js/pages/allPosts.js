import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import { findPosts } from "../data/dataFromApi.js";

addHeaderForPage(pageNames.ALL_POSTS);
addFooterForPage();

const postToHtml = (post) => {
  const { id, dateString, title, summary, featuredImage} = post;

  return /*template*/`
    <a href="post.html?id=${id}">
      <div>
        <p>${dateString}</p>
        <h2>${title}</h2>
        <img height="200" src="${featuredImage.src}">
        <div class="article-introduction">${summary}</div>
      </div>    
    </a>
  `;
};

const addPostsToHtml = (posts) => {
  const htmlPosts = posts.map(postToHtml).join("");
  document.querySelector("main").insertAdjacentHTML("afterBegin", htmlPosts);
};

findPosts().then(addPostsToHtml);