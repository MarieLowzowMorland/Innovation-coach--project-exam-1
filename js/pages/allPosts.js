import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import postToHtml from "../components/post.js";
import addSearchbarTo from "../components/searchbar.js";
import { findPosts } from "../data/dataFromApi.js";

addHeaderForPage(pageNames.ALL_POSTS);
addFooterForPage();

const searchParameters = new URLSearchParams(location.search);

const topic = searchParameters.get("topic");
const search = searchParameters.get("text");

let fetchingPosts = true;
let pageNumber = 1;

const fetchMorePosts = async (event) => {
  event.stopPropagation();
  if(fetchingPosts){
    return;
  }

  fetchingPosts = true;
  const newPosts = await findPosts(++pageNumber, topic, search);
  
  if(!newPosts){
    document.getElementById("more-posts").classList.add("hidden");
    return;
  }


  const htmlPosts = newPosts.map(postToHtml);
  document.getElementById("posts-container").insertAdjacentHTML("beforeend", htmlPosts.join(""));
  fetchingPosts = false;
}

const addPostsToHtml = (posts) => {
  const htmlPosts = posts.map(postToHtml)
  const search = document.getElementById("search-container");

  const firstPost = htmlPosts.shift();
  search.insertAdjacentHTML("beforebegin", firstPost);
  search.insertAdjacentHTML("afterend", htmlPosts.join(""));
  fetchingPosts = false;

  document.getElementById("more-posts").addEventListener("click", fetchMorePosts);
};

addSearchbarTo(document.getElementById("posts-container"));
findPosts(pageNumber, topic, search).then(addPostsToHtml);