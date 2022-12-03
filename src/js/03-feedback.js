import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

let formData = {};
const LOCALSTORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  formData = {};
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onFormInput(e) {
  if (localStorage.getItem(LOCALSTORAGE_KEY)) {
    formData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  }
  formData[e.target.name] = e.target.value;
  const stringifiedFormData = JSON.stringify(formData);
  localStorage.setItem(LOCALSTORAGE_KEY, stringifiedFormData);
}

function showLocalStorageData() {
  const savedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (savedData) {
    refs.input.value = savedData.email != undefined ? savedData.email : '';
    refs.textarea.value =
      savedData.message != undefined ? savedData.message : '';
  }
}

showLocalStorageData();
