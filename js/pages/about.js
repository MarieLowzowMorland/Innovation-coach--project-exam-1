import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";

addHeaderForPage(pageNames.ABOUT);
addFooterForPage();

const insertCorrectAge = () => {
  document.getElementById("myage").innerHTML = new Date().getFullYear() - 1 - 1989;
}
insertCorrectAge();