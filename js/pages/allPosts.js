import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import postToHtml from "../components/post.js";
import addSearchbarTo from "../components/searchbar.js";
import { findPosts } from "../data/dataFromApi.js";
import { SadFace } from "../templates/svgIcons.js";

addHeaderForPage(pageNames.ALL_POSTS);
addFooterForPage();

const searchParameters = new URLSearchParams(location.search);

const topic = searchParameters.get("topic");
const search = searchParameters.get("text");

let fetchingPosts = true;
let pageNumber = 1;

const hideFetchMorePostsButton = () => {
  document.getElementById("more-posts").classList.add("hidden");
}

const fetchMorePosts = async (event) => {
  event.stopPropagation();
  if(fetchingPosts){
    return;
  }

  fetchingPosts = true;
  const postsResponse = await findPosts(++pageNumber, topic, search);
  const { totalPages, posts } = postsResponse;
  
  if(!posts || !posts.length){
    hideFetchMorePostsButton();
    return;
  } else if ( totalPages <= pageNumber) {
    hideFetchMorePostsButton();
  }


  const htmlPosts = posts.map(postToHtml);
  document.getElementById("posts-container").insertAdjacentHTML("beforeend", htmlPosts.join(""));
  fetchingPosts = false;
}

const addNoResultMessage = () => {
  const htmlMessage = /*template*/`
    <div id="no-result">
      <h2>Sorry, no matches...</h2>
      <p>Sorry, but it does not look like I have a post on the topic you are requesting. 
        Feel free to <a href="${pageNames.CONTACT.url}">send me a message</a> 
        with tips on which topics you miss.
      </p>
      ${SadFace()}
    </div>`;
  document.getElementById("posts-container").insertAdjacentHTML("beforeend", htmlMessage);
}

const addPostsToHtml = (postsResponse) => {
  const { totalPages, posts } = postsResponse;
  console.log(posts);
  if(!posts || !posts.length){
    addNoResultMessage();
    hideFetchMorePostsButton();
    return;
  }

  if ( totalPages <= pageNumber) {
    hideFetchMorePostsButton();
  }

  const htmlPosts = posts.map(postToHtml)
  document.getElementById("posts-container").insertAdjacentHTML("beforeend", htmlPosts.join(""));

  fetchingPosts = false;
  document.getElementById("more-posts").addEventListener("click", fetchMorePosts);
};

addSearchbarTo(document.getElementById("posts-container"), search, topic);
findPosts(pageNumber, topic, search).then(addPostsToHtml);