document.querySelector("main").insertAdjacentHTML("afterbegin", '<div id="user-messages"></div>');

const addUserMessage = (message) => {
  if(!message){
    return;
  }

  const messagesContainer = document.getElementById("user-messages");
  messagesContainer.insertAdjacentHTML("afterbegin", `<p>${message}</p>`);
  const newMessageElement = messagesContainer.firstChild;
  setTimeout(() => newMessageElement.remove(), 3000);
};

export default addUserMessage;