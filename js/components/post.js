const postToHtml = (post) => {
  const { id, dateString, title, summary, featuredImage} = post;

  return /*template*/`
    <div class="post-wrapper">
      <a href="post.html?id=${id}" class="post">
        <div>
          <div class="reverse-column-order">
            <h2>${title}</h2>
            <p class="date">${dateString}</p>
          </div>
          <div class="article-introduction">${summary}</div>
          <p class="link">Read more </p>
        </div>
        <!-- No alt text for posts in a "list" context -->
        <div role="img" 
          class="post-image-wrapper" 
          style='background-image: url("${featuredImage.src}")'>
        </div>
      </a>
    </div>`;
};

export default postToHtml;