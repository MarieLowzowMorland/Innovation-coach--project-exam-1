const postToHtml = (post) => {
  const { id, dateString, title, summary, featuredImage} = post;
  let altTextAttribute = "";
  if(featuredImage.alt_text){
    altTextAttribute = `aria-label="${featuredImage.alt_text}"`
  }

  return /*template*/`
    <a href="post.html?id=${id}" class="post">
      <div>
        <div class="reverse-column-order">
          <h2>${title}</h2>
          <p class="date">${dateString}</p>
        </div>
        <div class="article-introduction">${summary}</div>
        <p class="link">Read more </p>
      </div>
      <div role="img" ${altTextAttribute}
        class="post-image-wrapper" 
        style='background-image: url("${featuredImage.src}")'>
      </div>
    </a>`;
};

export default postToHtml;