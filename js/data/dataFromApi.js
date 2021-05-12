const apiPostsBaseUrl = "https://morlanddesign.one/innovation-coach-admin/wp-json/wp/v2/posts";
const apiCategoriesUrl = "https://morlanddesign.one/innovation-coach-admin/wp-json/wp/v2/categories?per_page=100";
const contactFormUrl = "https://morlanddesign.one/innovation-coach-admin/wp-json/contact-form-7/v1/contact-forms/170/feedback";

export const sendContactForm = async (form) => {
  const rawResponse = await fetch(contactFormUrl, {
    method: 'POST',
    body: new FormData(form)
  });
  const content = await rawResponse.json();
  return content.status === "mail_sent";
};

export const findCategoriesWithPosts = async () => {
  try {
    const response = await fetch(apiCategoriesUrl);
    const categories = await response.json();
    return categories
      .filter(category => category.count > 0)
      .map(category => {
        const { id, name } = category;
        return { id, name } 
      });
  } catch (error) {
    console.log(error);
  }
};

export const findPostById = async (id) => {
  try {
    const response = await fetch(`${apiPostsBaseUrl}/${id}?_embed`);
    const postFromWP = await response.json();
    return postInfo(postFromWP);
  } catch (error) {
    console.log(error);
  }
};

export const findPosts = async (pageNumber, topic, search) => {
  const page = pageNumber || 1;
  
  let categoryQuery = "";
  if (topic) {
    categoryQuery= `&categories=${topic}`
  };
  
  let searchQuery = "";
  if (search) {
    searchQuery= `&search=${search}`
  };

  try {
    const response = await fetch(`${apiPostsBaseUrl}?_embed&page=${page}${categoryQuery}${searchQuery}`);
    if(response.status < 200 || response.status > 300){
      throw new Error("Error, maybe no more results");
    }

    const totalPages = response.headers.get("x-wp-totalpages");
    const postsFromWP = await response.json();
    return { totalPages, posts: postsFromWP.map(postInfo) };
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
    .map(media => {
      const { id, alt_text, source_url } = media;
      return {id, alt_text, src: source_url }
    })[0];

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