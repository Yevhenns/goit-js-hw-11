import { getPhotos } from './utils/apiService';
import { createGalleryMarkup } from './utils/markup';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  btn: document.querySelector('[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();

  const searchQuery = evt.currentTarget.searchQuery.value;
  console.log(searchQuery);

  const photos = await getPhotos(searchQuery, 1);

  refs.gallery.innerHTML = createGalleryMarkup(photos);
}
