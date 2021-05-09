import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import postToHtml from "../components/post.js";
import addSearchbarTo from "../components/searchbar.js";
import createCarousel from "../components/postCarousel.js";
import { findPosts } from "../data/dataFromApi.js";

addHeaderForPage(pageNames.HOME);
addFooterForPage();

const addFirstPostToHtml = (firstPost) => {
  if(!firstPost){
    return;
  }

  const search = document.getElementById("search-container");
  search.insertAdjacentHTML("beforebegin", postToHtml(firstPost));
};

addSearchbarTo(document.getElementById("first-post-container"));
findPosts().then((posts) => {
  const firstPost = posts.shift();
  addFirstPostToHtml(firstPost);
  createCarousel(posts, ".post-slider-wrapper");
});