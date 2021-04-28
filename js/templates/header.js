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

const addHeaderForPage = (selectedPage) => {  
  document
    .querySelector("main")
    .insertAdjacentHTML("beforebegin", headerTemplate(selectedPage));
}

const link = ( selectedPage, linkToPage ) =>  /*template*/ `
  <li>
    <a href="${linkToPage.url}" class="${selectedPage === linkToPage ? "active" : ""}">
      ${linkToPage.name}
    </a>
  </li>`;

const headerTemplate = ( selectedPage ) => /*template*/ `
  <header>
    <nav>
      <div class="menu">
        <ul>
          ${link(selectedPage, pageNames.HOME)}
          ${link(selectedPage, pageNames.ALL_POSTS)}
          ${link(selectedPage, pageNames.TOOLS_AND_LINKS)}
          ${link(selectedPage, pageNames.ABOUT)}
          ${link(selectedPage, pageNames.CONTACT)}
        </ul>
    </nav>
  </header>`;
      

export default addHeaderForPage;
