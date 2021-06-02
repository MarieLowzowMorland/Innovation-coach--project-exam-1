const commentFormUrl = "https://morlanddesign.one/innovation-coach-admin/wp-json/wp/v2/comments";

export const sendCommentForm = async (form) => {
  try {
    const rawResponse = await fetch(commentFormUrl, {
      method: 'POST',
      body: new FormData(form)
    });
    const content = await rawResponse.json();
    return content.status === "approved";
  } catch (error) {
    console.log(error);
    return false;
  }
};

const dateToString = (date) => 
  new Date(date).toLocaleString("en", {year: "numeric", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hour12: false});

export const findCommentsForPost = async (id) => {
  try {
    const response = await fetch(`${commentFormUrl}?per_page=100&post=${id}`);
    const comments = await response.json();
    return comments.map(rawComment => {
      const { author_name, date, content } = rawComment;
      return { 
        name: author_name || "Anonymous user", 
        date: dateToString(date), 
        content: content.rendered
      }
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};