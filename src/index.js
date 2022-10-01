import { getPhotos } from './utils/apiService';
import { createGalleryMarkup } from './utils/markup';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  btn: document.querySelector('[type="submit"]'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();

  const searchQuery = refs.input.value;
  console.log(searchQuery);

  const photos = await getPhotos(searchQuery, 1);
  console.log(photos);

  refs.gallery.innerHTML = createGalleryMarkup(photos);
}
