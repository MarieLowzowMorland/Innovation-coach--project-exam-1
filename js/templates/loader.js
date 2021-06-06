export const Loader = () => /*template*/
  `<div id="loader" role="img" aria-label="Loading page.">
  <span id="fisrt-circle"></span>
  <div id="line-wrapper"><span id="line"></span></div>
  <span id="second-circle"></span>
  </div>`;

export const removeLoader = () =>
document.getElementById("loader").remove();