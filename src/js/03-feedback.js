import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const textarea = document.querySelector('textarea');
const form = document.querySelector('form');

form.addEventListener('submit', onFormSubmit);
textarea.addEventListener('input', throttle(onFormInput, 200));
form.addEventListener('input', onFormInput);

receiveMessageFromLocalStorage();

function onFormInput(event) {
  console.log(event.target);
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}


function onFormSubmit(event) {
  event.preventDefault();
  event.target.reset(); 
  localStorage.removeItem(STORAGE_KEY);
  const message = event.target.value;
  localStorage.setItem(STORAGE_KEY, message);
}

function receiveMessageFromLocalStorage() {
  let savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    savedMessage = JSON.parse(savedMessage);
    console.log(savedMessage);
    Object.entries(savedMessage).forEach(([name, value]) => {
      console.log(name, value);
      form.elements[name].value = value;
      formData[name] = value;
    })
  }
}