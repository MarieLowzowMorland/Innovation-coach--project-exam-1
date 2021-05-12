import { pageNames } from "../templates/header.js";
import { Search, ArrowDropdown } from "../templates/svgIcons.js";
import { findCategoriesWithPosts } from "../data/dataFromApi.js";

const searchbarTemplate = () => /*template*/`
  <form id="search-container" action="${pageNames.ALL_POSTS.url}">
    <div class="description">
      <p>Looking for a something specific?</p>
    </div>
    <div class="inputs">
      <label for="search-text">
        Search by text
      </label>
      <label for="search-topic">
        Search by topic
      </label>
      <input id="search-text" name="text" />
      <div class="select-wrapper">
        <select id="search-topic" name="topic">
          <option value="" selected>All topics</option>
        </select>
        <div class="arrow">${ArrowDropdown()}</div>
      </div>
      <div class="separator-line"><span></span></div>
      <button type="submit" id="search-button" aria-label="Search.">${Search()}</button>
    </div>
  </form>`;

const addCategoryOptions = (categories) => {
  const options = categories
    .map(category => 
      /*template*/`<option value="${category.id}">${category.name}</option>`
    )
    .join("");

  document.querySelector("#search-container select option").insertAdjacentHTML("afterend", options);
}

const addSearchbarTo = (element, textSearch, topicSearch) => {
  element.insertAdjacentHTML("afterbegin", searchbarTemplate());
  document.getElementById("search-text").value = textSearch;
  findCategoriesWithPosts().then(categories => {
    addCategoryOptions(categories);
    if(topicSearch && categories.find(category => category.id.toString() === topicSearch)){
      document.querySelector(`#search-topic option[value="${topicSearch}"]`).setAttribute("selected", "selected");
    }
  });
};

export default addSearchbarTo;