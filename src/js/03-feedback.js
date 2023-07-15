import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

let feedbackForm = {};

formEl.addEventListener('input', throttle(onInputChange, 500));
formEl.addEventListener('submit', onFormSubmit);

function onInputChange(event) {
  feedbackForm[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackForm));
}

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;
  if (email.value === '' || message.value === '') {
    return alert('Please fill in all fields of the form');
  }
  e.currentTarget.reset();
  console.log(feedbackForm);
  feedbackForm = {};
  localStorage.removeItem(STORAGE_KEY);
}

function populateInput() {
  const saveInput = localStorage.getItem(STORAGE_KEY);
  if (saveInput) {
    feedbackForm = JSON.parse(saveInput);
    console.log(feedbackForm);
    for (let key in feedbackForm) {
      formEl[key].value = feedbackForm[key];
    }
  }
}

populateInput();
