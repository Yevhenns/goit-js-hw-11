import { getPhotos } from './utils/apiService';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  btn: document.querySelector('[type="submit"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();

  const searchQuery = refs.input.value;
  console.log(searchQuery);

  getPhotos(searchQuery, 1);
}
