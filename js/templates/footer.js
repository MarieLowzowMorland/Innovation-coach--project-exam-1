const addFooterForPage = () => {
  document
    .querySelector("main")
    .insertAdjacentHTML("afterend", footerTemplate());
}

const footerTemplate = () => /*template*/`
  <footer>
    Footer
  </footer>`;

export default addFooterForPage;