import { HamburgerMenu, Logo, Play, Pause } from "../templates/svgIcons.js";
import { ArrowDown } from "../templates/svgIcons.js";

export const pageNames = {
  HOME: {
    name: "Home",
    url: "index.html",
    hasSearch: true,
  },
  ALL_POSTS: {
    name: "All Posts",
    url: "allPosts.html",
    hasSearch: true,
  },
  POST: {
    name: "Post",
    url: "post.html",
    hasSearch: false,
  },
  TOOLS_AND_LINKS: {
    name: "Tools and Links",
    url: "toolsAndLinks.html",
    hasSearch: false,
  },
  ABOUT: {
    name: "About",
    url: "about.html",
    hasSearch: false,
  },
  CONTACT: {
    name: "Contact",
    url: "contact.html",
    hasSearch: false,
  },
};

const stickyNav = () => {
  function checkIfNavbarShouldStickToTop() {
    const nav = document.getElementById("main-nav");
    const topOfNavbar = nav.offsetTop;

    if (window.pageYOffset > topOfNavbar) {
      nav.classList.add("stick-to-top");
    } else {
      nav.classList.remove("stick-to-top");
    }
  }

  window.onscroll = checkIfNavbarShouldStickToTop;
};

const toggleMenu = (event) => {
  event.stopPropagation();
  event.currentTarget.blur();
  document.getElementById("menu").classList.toggle("open-menu");
};

const mediaQueryForReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const shouldStartWithVideoPaused = mediaQueryForReducedMotion && mediaQueryForReducedMotion.matches;
let playing = !shouldStartWithVideoPaused;
const toggleVideo = (event) => {
  const videControl = document.getElementById("video-control");
  const video = document.getElementById("homepage-video");

  if (playing) {
    video.pause();
    videControl.innerHTML = Play();
    videControl.setAttribute("aria-label", "Play background video.");
  } else {
    video.play();
    videControl.innerHTML = Pause();
    videControl.setAttribute("aria-label", "Pause background video.");
  }
  playing = !playing;
};

const addHeaderForPage = (selectedPage) => {
  document
    .querySelector("main")
    .insertAdjacentHTML("beforebegin", headerTemplate(selectedPage));

  document.querySelector("#menu button").addEventListener("click", toggleMenu);
  document.getElementById("close-menu").addEventListener("click", toggleMenu);
  stickyNav();
  if (selectedPage === pageNames.HOME) {
    const bannerCircle = document.querySelector("header .banner-circle");
    const homepageVideo = document.getElementById("homepage-video");
    const videoControl = document.getElementById("video-control");
    const initialAvailableWidth = window.innerWidth;
    let initialAvailableHeight = window.innerHeight;
    if (initialAvailableHeight > 1500) {
      initialAvailableHeight = 1500;
    }

    bannerCircle.addEventListener("click", toggleVideo);
    homepageVideo.addEventListener("click", toggleVideo);
    videoControl.addEventListener("click", toggleVideo);

    homepageVideo.style.height = `${initialAvailableHeight}px`;
    videoControl.style.top = `calc(${initialAvailableHeight}px - 5rem)`;
    bannerCircle.style.height = `${initialAvailableHeight}px`;
    if (initialAvailableWidth >= 768) {
      bannerCircle.style.marginTop = `${initialAvailableHeight / 2}px`;
    }
  }
};

const link = (selectedPage, linkToPage) => {
  let classNames = "discrete-button";
  let ariaCurrentAttr = "";
  if( selectedPage === linkToPage ){
    classNames += " active";
    ariaCurrentAttr = 'aria-current="page"';
  }
  
  return /*template*/ `
  <li>
    <a href="${linkToPage.url}" 
      data-text="${linkToPage.name}"
      ${ariaCurrentAttr}
      class="${classNames}">
      ${linkToPage.name}
    </a>
    <span class="circle"></span>
  </li>`
};

const searchSkiplink = () => /*template*/ `
  <li>
    <a href="#search-container" class="skiplink" aria-label="Go to search bar">Search</a>
  </li>`;

const navTemplate = (selectedPage) => {
  let homeClassName = "logo";
  let homeAriaCurrentAttr = "";
  if( selectedPage === pageNames.HOME ){
    homeClassName += " active";
    homeAriaCurrentAttr = 'aria-current="page"';
  }
  
  return /*template*/ `
  <nav id="skiplink" aria-label="Skiplink menu">
    <ul>
      ${selectedPage.hasSearch ? searchSkiplink() : ""}
      <li><a href="#main" class="skiplink" aria-label="Go to main content">Main content</a></li>
    </ul>
  </nav>
  <nav id="main-nav" aria-label="Main menu">
    <div id="menu">
      <div>
        <a href="${pageNames.HOME.url}"
          ${homeAriaCurrentAttr}
          class="${homeClassName}"
        >
          ${Logo()}
        </a>
        <button class="tablet-hidden" aria-label="Hamburger menu.">
          <span id="hamburger-menu">${HamburgerMenu()}</span>
        </button>
      </div>
      <ul>
        ${link(selectedPage, pageNames.ALL_POSTS)}
        ${link(selectedPage, pageNames.ABOUT)}
        ${link(selectedPage, pageNames.CONTACT)}
        <button id="close-menu">Close menu</button>
      </ul>
    </div>
  </nav>`
};

const homePageTemplate = () => /*template*/ `
    <header class="homepage">
      ${navTemplate(pageNames.HOME)}
      <div class="banner-content">
        <div class="banner-circle">
          <div>
            <h1 class="blog-name">Innovation Coach</h1>
            <p class="slogan">Helping you connect the dots</p>
            <a class="cta" href="#first-post-container"> See newest articles ${ArrowDown()}</a>
          </div>
          </div>
        <button id="video-control" aria-label="Pause background video.">${Pause()}</button>
      </div>
      <video id="homepage-video" width="320" height="240" ${shouldStartWithVideoPaused ? "" : "autoplay"} muted loop playsinline src="videos/homepage-video.mp4" poster="images/banner.jpg">
        Your browser does not support the video tag.
      </video>
    </header>`;

const headerTemplate = (selectedPage) => {
  if (selectedPage === pageNames.HOME) {
    return homePageTemplate();
  } else {
    return /*template*/ `
        <header>${navTemplate(selectedPage)}</header>
      `;
  }
};

export default addHeaderForPage;
