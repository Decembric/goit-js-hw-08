import throttle from "lodash.throttle";

// const refs = {
//   form: document.querySelector('.feedback-form'),
//   textarea: document.querySelector('.feedback-form textarea'),
// };

// refs.form.addEventListener('submit', onFormSubmit);
// refs.textarea.addEventListener('input', onTextareaInput);

// localStorage.clear()


// function onFormSubmit(event) {
//   event.preventDefault()
//   console.log('Get form')
//   event.currentTarget.reset()
// }

// function onTextareaInput(event) {
//   const message = event.currentTarget.value
//   localStorage.setItem('feedback-form-state', message)
// }

// function getInfoFromTextarea() {
//   const savedMessage = localStorage.getItem('feedback-form-state')
  
//   if (savedMessage) {
//     console.log(savedMessage)
//   }
// }

const STORAGE_KEY = 'feedback-form-state'

const formData = {}

const textarea = document.querySelector('textarea')
const form = document.querySelector('form')

form.addEventListener('submit', onFormSubmit)
textarea.addEventListener('input', throttle(onFormInput, 200))
form.addEventListener('input', onFormInput)

receiveMessageFromLocalStorage()

function onFormInput(event) {
  console.log(event.target)
  formData[event.target.name] = event.target.value
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
}

// function onTextareaInput(event) {
//   localStorage.setItem(STORAGE_KEY, message)
  
// }

function onFormSubmit(event) {
  event.preventDefault()
  if (message) {
    event.target.reset() 
    localStorage.removeItem(STORAGE_KEY)
    const message = event.target.value
    // const name = event.target.name
    console.log(message)
    // console.log(name)
    localStorage.setItem(STORAGE_KEY, message)
    
  }
}

function receiveMessageFromLocalStorage() {
  let savedMessage = localStorage.getItem(STORAGE_KEY)
  if (savedMessage) {
    savedMessage = JSON.parse(savedMessage)
    console.log(savedMessage)
    Object.entries(savedMessage).forEach(([name, value]) => {
      console.log(name, value)
      form.elements[name].value = value
      formData[name] = value
    })
  }
}