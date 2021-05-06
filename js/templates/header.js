import { hamburgerMenu } from '../templates/svgIcons.js';

export const pageNames = {
  HOME: {
    name: "Home",
    url: "index.html"
  },
  ALL_POSTS: {
    name: "All Posts",
    url: "allPosts.html"
  },
  POST: {
    name: "Post",
    url: "post.html"
  },
  TOOLS_AND_LINKS: {
    name: "Tools and Links",
    url: "toolsAndLinks.html"
  },
  ABOUT: {
    name: "About",
    url: "about.html"
  },
  CONTACT: {
    name: "Contact",
    url: "contact.html"
  },
};

const stickyNav = () => {
  function checkIfNavbarShouldStickToTop() {
    const nav = document.querySelector("nav");
    const topOfNavbar = nav.offsetTop;

    if (window.pageYOffset > topOfNavbar) {
      nav.classList.add("stick-to-top")
    } else {
      nav.classList.remove("stick-to-top");
    }
  }

  window.onscroll = checkIfNavbarShouldStickToTop;
}

const toggleMenu = (event) => {
  event.stopPropagation();
  event.currentTarget.blur();
  document.getElementById("menu").classList.toggle("open-menu");
}

const addHeaderForPage = (selectedPage) => {  
  document
    .querySelector("main")
    .insertAdjacentHTML("beforebegin", headerTemplate(selectedPage));

  document.getElementById("menuline").addEventListener("click", toggleMenu);
  stickyNav();
}

const link = ( selectedPage, linkToPage ) =>  /*template*/ `
  <li>
    <a href="${linkToPage.url}" data-text="${linkToPage.name}" class="${selectedPage === linkToPage ? "active" : ""} discrete-button">
      ${linkToPage.name}
    </a>
    <span class="circle"></span>
  </li>`;
  

const headerTemplate = ( selectedPage ) => /*template*/ `
  <header class="${selectedPage === pageNames.HOME ? "homepage" : ""}">
    <nav>
      <div id="menu">
        <button id="menuline" class="tablet-hidden">
          <h1>${selectedPage.name}</h1>
          <span id="hamburger-menu">${hamburgerMenu()}</span>
        </button>
        <ul>
          ${link(selectedPage, pageNames.HOME)}
          ${link(selectedPage, pageNames.ALL_POSTS)}
          ${link(selectedPage, pageNames.TOOLS_AND_LINKS)}
          ${link(selectedPage, pageNames.ABOUT)}
          ${link(selectedPage, pageNames.CONTACT)}
        </ul>
    </nav>
    <div class="banner mobile-hidden">
      <div>
        <p class="blog-name">Innovation Coach</p>
        <p class="slogan">Help your ideas come alive</p>
        <a class="cta" href="allPosts.html"> See newest articles </a>
      </div>
      <img src="images/Hovedbilde.jpg" height="200" class="header-image" alt=""></div>
    </div>
  </header>`;
      

export default addHeaderForPage;
