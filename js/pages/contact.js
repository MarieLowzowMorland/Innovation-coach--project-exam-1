import addHeaderForPage, { pageNames } from "../templates/header.js";
import addFooterForPage from "../templates/footer.js";
import addValidationToForm from "../components/formValidation.js";
import addUserMessage from "../components/userMessage.js";

addHeaderForPage(pageNames.CONTACT);
addFooterForPage();
addValidationToForm("contact-form", () => addUserMessage("Thank you for your message."));
