import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';

const textarea = document.querySelector('textarea');
const input = document.querySelector('input')
const form = document.querySelector('.feedback-form');


form.addEventListener('submit', onFormSubmit);
textarea.addEventListener('input', throttle(onFormInput, 200));
form.addEventListener('input', onFormInput);

receiveMessageFromLocalStorage();


function onFormInput(event) {
    let message = localStorage.getItem(STORAGE_KEY);
    if (message) {
      message = JSON.parse(message);
    } else {
      message = {}
    }
  message[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(message));
  }


function onFormSubmit(event) {
  event.preventDefault();
  const formElements = event.target.elements
  const email = formElements.email.value
  const textContent = formElements.message.value
  if (email === "" || textContent === "") {
    return console.log("Будь ласка, заповніть усі поля");
  }
  console.log(`Email: ${email}, Message: ${textContent}`);
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
}

  function receiveMessageFromLocalStorage() {
    let savedMessage = localStorage.getItem(STORAGE_KEY);
    if (savedMessage) {
      savedMessage = JSON.parse(savedMessage);
      Object.entries(savedMessage).forEach(([name, value]) => {
        form.elements[name].value = value;
        savedMessage = '';
      })
    }
  }
