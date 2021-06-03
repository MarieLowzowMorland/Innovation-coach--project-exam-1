import addHeaderForPage, { pageNames } from "../templates/header.js";
import { Loader, removeLoader } from "../templates/loader.js"
import addFooterForPage from "../templates/footer.js";
import postToHtml from "../components/post.js";
import addSearchbarTo from "../components/searchbar.js";
import createCarousel from "../components/postCarousel.js";
import { findPosts } from "../api/posts.js";

addHeaderForPage(pageNames.HOME);
addFooterForPage();
document.getElementById("main").insertAdjacentHTML("afterbegin", Loader());

const addFirstPostToHtml = (firstPost) => {
  if(!firstPost){
    return;
  }

  const search = document.getElementById("search-container");
  search.insertAdjacentHTML("beforebegin", postToHtml(firstPost));
};

findPosts().then((postsResponse) => {
  document.querySelector("main").classList.remove("loading");
  removeLoader();
  addSearchbarTo(document.getElementById("first-post-container"));

  const posts = postsResponse.posts;
  if( !posts || !posts.length ){
    return;
  }

  const firstPost = posts.shift();
  addFirstPostToHtml(firstPost);
  createCarousel(posts, ".post-slider-wrapper");
});