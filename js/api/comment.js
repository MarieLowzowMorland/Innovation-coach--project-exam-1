const commentFormUrl = "https://morlanddesign.one/innovation-coach-admin/wp-json/wp/v2/comments";

export const sendCommentForm = async (form) => {
  const rawResponse = await fetch(commentFormUrl, {
    method: 'POST',
    body: new FormData(form)
  });
  const content = await rawResponse.json();
  return content.status === "approved";
};