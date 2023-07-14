import throttle from 'lodash.throttle';

const formEmailEl = document.querySelector('.feedback-form [name=email]');
const formMessageEl = document.querySelector('.feedback-form [name=message]');
const formSubmitEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const feedbackForm = {
  email: '',
  message: '',
};

populateInput();

formEmailEl.addEventListener('input', throttle(onInputChangeEmail, 500));
formMessageEl.addEventListener('input', throttle(onInputChangeMessage, 500));
formSubmitEl.addEventListener('submit', onFormSubmit);

function onInputChangeEmail(event) {
  feedbackForm.email = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackForm));
}
function onInputChangeMessage(event) {
  feedbackForm.message = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackForm));
}
function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(feedbackForm);
}

function populateInput() {
  const saveInput = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (saveInput) {
    formEmailEl.value = saveInput.email;
    formMessageEl.value = saveInput.message;
  }
}
