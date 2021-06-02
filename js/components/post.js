const postToHtml = (post) => {
  const { id, dateString, title, summary, featuredImage} = post;

  return /*template*/`
    <div class="post-wrapper">
      <article class="post">
        <section>
          <header class="reverse-column-order">
            <h2>${title}</h2>
            <p class="date">${dateString}</p>
          </header>
          <div class="article-introduction">${summary}</div>
          <a href="post.html?id=${id}" aria-label="Read more about ${title}" class="link">Read more </a>
        </section>
        <!-- No alt text for posts in a "list" context -->
        <div role="img" 
          class="post-image-wrapper" 
          style='background-image: url("${featuredImage.src}")'>
        </div>
      </article>
    </div>`;
};

export default postToHtml;