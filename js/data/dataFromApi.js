const apiPostsBaseUrl = "https://morlanddesign.one/innovation-coach-admin/wp-json/wp/v2/posts";

export const findPostById = async (id) => {
  try {
    const response = await fetch(`${apiPostsBaseUrl}/${id}?_embed`);
    const postFromWP = await response.json();
    return postInfo(postFromWP);
  } catch (error) {
    console.log(error);
  }
};

export const findPosts = async (pageNumber) => {
  const page = pageNumber || 1;
  try {
    const response = await fetch(`${apiPostsBaseUrl}?_embed&page=${page}`);
    if(response.status < 200 || response.status > 300){
      throw new Error("Error, maybe no more results");
    }

    const postsFromWP = await response.json();
    return postsFromWP.map(postInfo);
  } catch (error) {
    console.log(error);
  }
};

const dateToString = (date) => 
  new Date(date).toLocaleString("en", {year: "numeric", day: "numeric", month: "long"});

const postInfo = (postFromWP) => {
  const {
    id,
    title,
    _embedded,
    excerpt,
    content,
    date
  } = postFromWP;

  const featuredImage = _embedded["wp:featuredmedia"]
    .map(media => {return {id: media.id, src: media.source_url }})[0];

  const categories = _embedded["wp:term"][0]
    .filter(term => term.taxonomy === "category")
    .map(term => {return {id: term.id, name: term.name}});

  return {
    id,
    title: title.rendered,
    content: content.rendered,
    dateString: dateToString(date),
    summary: excerpt.rendered,
    featuredImage,
    categories
  }
};