const addFooterForPage = () => {
  document
    .querySelector("main")
    .insertAdjacentHTML("afterend", footerTemplate());
}

const footerTemplate = () => /*template*/`
  <footer>
    <p>Copyright © Marie Lowzow Morland</p>
  </footer>`;

export default addFooterForPage;