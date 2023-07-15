import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const formSubmitEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const feedbackForm = {};

populateInput();

formEl.addEventListener('input', throttle(onInputChange, 500));
formEl.addEventListener('submit', onFormSubmit);

function onInputChange(event) {
  feedbackForm[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackForm));
}

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = eventCurrentTarget;
  if (email.value === '' || message.value === '') {
    return alert('Please fill in all fields of the form');
  }
  event.currentTarget.reset();
  feedbackForm = {};
  localStorage.removeItem(STORAGE_KEY);
}

function populateInput() {
  const saveInput = localStorage.getItem(STORAGE_KEY);
  if (saveInput) {
    feedbackForm = JSON.parse(saveInput);
    for (let key in feedbackForm) {
      formEl[key].value = feedbackForm[key];
    }
  }
}
