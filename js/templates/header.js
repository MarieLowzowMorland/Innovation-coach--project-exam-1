import { HamburgerMenu, Logo, Play, Pause } from "../templates/svgIcons.js";

export const pageNames = {
  HOME: {
    name: "Home",
    url: "index.html",
  },
  ALL_POSTS: {
    name: "All Posts",
    url: "allPosts.html",
  },
  POST: {
    name: "Post",
    url: "post.html",
  },
  TOOLS_AND_LINKS: {
    name: "Tools and Links",
    url: "toolsAndLinks.html",
  },
  ABOUT: {
    name: "About",
    url: "about.html",
  },
  CONTACT: {
    name: "Contact",
    url: "contact.html",
  },
};

const stickyNav = () => {
  function checkIfNavbarShouldStickToTop() {
    const nav = document.querySelector("nav");
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

let playing = true;
const toggleVideo = (event) => {
  const videControl = document.getElementById("video-control");
  const video = document.getElementById("homepage-video");

  if(playing){
    video.pause();
    videControl.innerHTML = Play();
    videControl.setAttribute("aria-label", "Play background video.");
  } else {
    video.play();
    videControl.innerHTML = Pause();
    videControl.setAttribute("aria-label", "Pause background video.");
  }
  playing = !playing;
}

const addHeaderForPage = (selectedPage) => {
  document
    .querySelector("main")
    .insertAdjacentHTML("beforebegin", headerTemplate(selectedPage));

  document.querySelector("#menu button").addEventListener("click", toggleMenu);
  stickyNav();
  if(selectedPage === pageNames.HOME){
    const bannerCircle = document.querySelector("header .banner-circle");
    const homepageVideo = document.getElementById("homepage-video");
    const videoControl = document.getElementById("video-control");
    let initialAvailableHeight = window.innerHeight;
    if( initialAvailableHeight > 1500){
      initialAvailableHeight = 1500;
    }

    bannerCircle.addEventListener("click", toggleVideo)
    homepageVideo.addEventListener("click", toggleVideo)
    videoControl.addEventListener("click", toggleVideo)

    bannerCircle.style.height = `${initialAvailableHeight}px`;
    homepageVideo.style.height = `${initialAvailableHeight}px`;
    videoControl.style.top = `calc(${initialAvailableHeight}px - 5rem)`;
  }
};

const link = (selectedPage, linkToPage) => /*template*/ `
  <li>
    <a href="${linkToPage.url}" data-text="${linkToPage.name}" class="${
      selectedPage === linkToPage ? "active" : ""
    } discrete-button">
      ${linkToPage.name}
    </a>
    <span class="circle"></span>
  </li>`;

const navTemplate = (selectedPage) => /*template*/ `
  <nav>
    <div id="menu">
      <div>
        <a href="${pageNames.HOME.url}"
          class="logo ${selectedPage === pageNames.HOME ? "active" : ""}"
        >
          ${Logo()}
        </a>
        <button class="tablet-hidden">
          <span id="hamburger-menu">${HamburgerMenu()}</span>
        </button>
      </div>
      <ul>
        ${link(selectedPage, pageNames.ALL_POSTS)}
        ${link(selectedPage, pageNames.ABOUT)}
        ${link(selectedPage, pageNames.CONTACT)}
      </ul>
    </div>
  </nav>`;

  const homePageTemplate = () => /*template*/ `
    <header class="homepage">
      ${navTemplate(pageNames.HOME)}
      <div class="banner-content">
        <div class="banner-circle">
          <div>
            <h1 class="blog-name">Innovation Coach</h1>
            <p class="slogan">Helping you connect the dots</p>
            <a class="cta" href="allPosts.html"> See newest articles </a>
          </div>
          </div>
        <button id="video-control" aria-label="Pause background video.">${Pause()}</button>
      </div>
      <video id="homepage-video" width="320" height="240" autoplay muted loop playsinline src="videos/homepage-video.mp4" poster="images/banner.jpg">
        Your browser does not support the video tag.
      </video>
    </header>`;

  const headerTemplate = (selectedPage) => {
    if(selectedPage === pageNames.HOME) {
      return homePageTemplate();
    } else {
      return /*template*/ `
        <header>${navTemplate(selectedPage)}</header>
      `;
    }
  };

export default addHeaderForPage;
