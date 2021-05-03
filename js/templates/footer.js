const addFooterForPage = () => {
  document
    .querySelector("main")
    .insertAdjacentHTML("afterend", footerTemplate());
}

const footerTemplate = () => /*template*/`
  <footer>
    <p>COPYRIGHT © Marie Lowzow Morland</p>
  </footer>`;

export default addFooterForPage;