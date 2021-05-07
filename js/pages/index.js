import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import postToHtml from "../components/post.js";
import addSearchbarTo from "../components/searchbar.js";
import createCarousel from "../components/postCarousel.js";
import { findPosts } from "../data/dataFromApi.js";

addHeaderForPage(pageNames.HOME);
addFooterForPage();

const addFirstPostToHtml = (posts) => {
  if(!posts){
    return;
  }

  const firstPost = postToHtml(posts[0])
  const search = document.getElementById("search-container");
  search.insertAdjacentHTML("beforebegin", firstPost);
};

addSearchbarTo(document.getElementById("first-post-container"));
findPosts().then((posts) => {
  addFirstPostToHtml(posts);
  createCarousel(posts, ".post-slider-wrapper");
});