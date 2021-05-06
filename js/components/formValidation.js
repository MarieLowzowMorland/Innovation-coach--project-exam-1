const validateForm = (onSuccess) => (event) => {
  event.preventDefault();
  const inputs = [
    ...Array.from(event.target.querySelectorAll("input")), 
    ...Array.from(event.target.querySelectorAll("textarea"))
  ];
  const formIsValid = inputs
      .map(validateInput)
      .every(valid => valid);  

  if(formIsValid){
    onSuccess();
    event.target.closest("form").reset();
  }
}

const validateInput = (inputElement) => {
  const {name, value, required, type, checked} = inputElement;
  const minlength = parseNumberOrDefault(inputElement.getAttribute("data-minlength"), 0);
  
  let errorMessages = [];
  if(required){
    errorMessages.push(validateRequired(requiredCheckValue(value, checked, type), name));
  }
  if(type === "email"){
    errorMessages.push(validateEmail(value, name));
  }
  if(minlength > 0){
    errorMessages.push(validateMinLength(value, minlength, name));
  }


  const errorMessage = errorMessages.join("")
  inputElement.parentElement.querySelector(".form-error").innerHTML = errorMessage;
  if (errorMessage === ""){
      inputElement.parentElement.classList.remove("invalid");
      return true;
  } else {
      inputElement.parentElement.classList.add("invalid");
      return false;
  };
}

const parseNumberOrDefault = (number, fallback) => {
  if (typeof number === "string") {
    number = parseFloat(number);
  }

  if (typeof number === "number" && !Number.isNaN(number)) {
    return number;
  }

  return fallback;
}

const requiredCheckValue = (value, checked, type) => {
  if(type !== "checkbox"){
    return value;
  }

  if(checked){
    return "checked";
  } else {
    return "";
  }
}

const validateRequired = (value, name) => {
  if(!value || value.trim().length === 0){
      return /*template*/`<p>${upperCaseFirst(name)} is required.</p>`
  } else {
      return "";
  }
}

const validateEmail = (value, name) => { 
  const regEx = /\S+@\S+\.\S+/;
  if (!value || regEx.test(value)){
      return "";
  } else {
      return /*template*/`<p>${upperCaseFirst(name)} must contain at least @ and a domain. I.e "test@example.com".</p>`;
  }
}

const validateMinLength = (value, minLength, name) => {
  if(!value || value.trim().length < minLength){
      return /*template*/`<p>${upperCaseFirst(name)} must be more than ${minLength - 1} without leading or trailing spaces. Currently ${value ? value.trim().length : 0} characters long</p>`
  } else {
      return "";
  }
}

const upperCaseFirst = (value) => value.charAt(0).toUpperCase() + value.substr(1);

const validateInputEventHandler = (event) => {
  validateInput(event.target);
}

const addValidationToForm = (formId, onSuccess) => {
  const form = document.getElementById(formId);
  const inputs = [
    ...form.querySelectorAll("input"), 
    ...form.querySelectorAll("textarea")
  ]

  form.addEventListener("submit", validateForm(onSuccess));
  inputs.forEach(input => input.addEventListener("input", validateInputEventHandler));
}

export default addValidationToForm;