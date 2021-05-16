import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import addValidationToForm from "../components/formValidation.js";
import addUserMessage from "../components/userMessage.js";
import { sendContactForm } from "../data/dataFromApi.js";

addHeaderForPage(pageNames.CONTACT);
addFooterForPage();
addValidationToForm("contact-form", async () => {
  const mailSent = await sendContactForm(document.getElementById("contact-form"));
  const userMessage = mailSent ? "Mail sent, thank you for your message!" : "A problem occured, please grab a cup of coffee and try again later.";
  addUserMessage(userMessage);
  return userMessage;
});