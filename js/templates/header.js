import { HamburgerMenu } from "../templates/svgIcons.js";

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

const addHeaderForPage = (selectedPage) => {
  document
    .querySelector("main")
    .insertAdjacentHTML("beforebegin", headerTemplate(selectedPage));

  document.getElementById("menuline").addEventListener("click", toggleMenu);
  stickyNav();
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

const headerTemplate = (selectedPage) => {
  const isHomePage = selectedPage === pageNames.HOME;
  const nameTagMobile = isHomePage ? "h1" : "span";
  const nameTagTablet = isHomePage ? "h1" : "p";
  return /*template*/ `
  <header class="${isHomePage ? "homepage" : ""}">
    <nav>
      <div id="menu">
        <button id="menuline" class="tablet-hidden">
          <${nameTagMobile} class="pagename">${
    selectedPage.name
  }</${nameTagMobile}>
          <span id="hamburger-menu">${HamburgerMenu()}</span>
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
        <${nameTagTablet} class="blog-name">Innovation Coach</${nameTagTablet}>
        <p class="slogan">Help your ideas come alive</p>
        <a class="cta" href="allPosts.html"> See newest articles </a>
      </div>
      <img src="images/Hovedbilde.jpg" height="200" class="header-image" alt=""></div>
    </div>

    <!-- Hotjar Tracking Code for https://innovation-coach.netlify.app/ -->
    <script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2390574,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    </script>
    
  </header>`;
};

export default addHeaderForPage;
