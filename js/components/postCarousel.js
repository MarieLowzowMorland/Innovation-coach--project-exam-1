import { ArrowLeft, ArrowRight } from "../templates/svgIcons.js";

const maxVisiblePosts = 4;
const minWidthPrPost = 220;
const postCarouselClass = "small-post";

const calculateNumberOfVisiblePosts = (postSlider) => {
  const width = postSlider.offsetWidth;
  return Math.min(Math.floor(width / minWidthPrPost), maxVisiblePosts);
}

const startCarousel = (posts, postSlider) => {
  let firstVisiblePost = 0; //Index that will be the first rendered 
  let numberOfVisiblePosts = calculateNumberOfVisiblePosts(postSlider);

  const indexMinusOne = (index) => {
    const minusOne = index - 1;
    if(minusOne < 0){
      return posts.length - 1;
    }
    return minusOne;
  }

  const indexPlusOne = (index) => {
    const plusOne = index + 1;
    if(plusOne >= posts.length){
      return 0;
    }
    return plusOne;
  }

  const addPost = (postIndex) => {
    postSlider.insertAdjacentHTML("beforeend", posts[postIndex].outerHTML);
  }

  const hideAllPosts = () => {
    postSlider.querySelectorAll(`.${postCarouselClass}`)
      .forEach(post => post.remove());
  }

  const showPosts = () => {
    hideAllPosts();
    let showIndex = firstVisiblePost;

    for(let i = 0; i < numberOfVisiblePosts; i++){
      addPost(showIndex);
      showIndex = indexPlusOne(showIndex);
    }
  }
  showPosts();
  
  const goLeft = () => {
    for(let i = 0; i < numberOfVisiblePosts; i++){
      firstVisiblePost = indexMinusOne(firstVisiblePost);
    }

    showPosts();
  }
  document.querySelector(".control-previous").addEventListener("click", goLeft);
  
  const goRight = () => {
    for(let i = 0; i < numberOfVisiblePosts; i++){
      firstVisiblePost = indexPlusOne(firstVisiblePost);
    }
    showPosts();
  }
  document.querySelector(".control-next").addEventListener("click", goRight);
  
  window.addEventListener("resize", () => {
    const newNumberOfPosts = calculateNumberOfVisiblePosts(postSlider);
    if(newNumberOfPosts != numberOfVisiblePosts){
      numberOfVisiblePosts = newNumberOfPosts;
      showPosts();
    }
  });
};

const controlElement = (direction, iconFunction) => /*template*/`
  <button class="controls control-${direction}" aria-label="${direction}.">
    ${iconFunction()}
  </div>`;

const postToHtml = (post) => {
  const { id, title, featuredImage} = post;

  return /*template*/`
    <a href="post.html?id=${id}" class="reverse-column-order ${postCarouselClass}">
      <h3>${title}</h3>
      <!-- No alt text for posts inside an anchor tag -->
      <img alt="" src="${featuredImage.src}"/>
    </a>`;
};

const createCarousel = (posts, wrapperSelector) => {
  //Add all posts and buttons
  const carouselWrapper = document.querySelector(wrapperSelector);
  carouselWrapper.insertAdjacentHTML("beforeend", controlElement("previous", ArrowLeft));
  carouselWrapper.insertAdjacentHTML("beforeend", '<div class="post-slider"></div>');
  carouselWrapper.insertAdjacentHTML("beforeend", controlElement("next", ArrowRight));

  const postSlider = carouselWrapper.querySelector(".post-slider");
  posts.forEach((post) =>
    postSlider.insertAdjacentHTML("beforeend", postToHtml(post))
  )

  //Copy html so that I can shuffle them around inside carusel
  const postElements = [...postSlider.querySelectorAll(`.${postCarouselClass}`)];
  startCarousel(postElements, postSlider);
};

export default createCarousel;