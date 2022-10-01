import apiService from './utils/apiService';
import { createGalleryMarkup } from './utils/markup';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  btn: document.querySelector('[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const apiPhotoService = new apiService();

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();

  const searchQuery = evt.currentTarget.searchQuery.value;
  console.log(searchQuery);

  apiPhotoService.query = searchQuery;
  const photos = await apiPhotoService.getPhotos();

  refs.gallery.innerHTML = createGalleryMarkup(photos);
}

refs.loadMoreBtn.addEventListener('click', loadMore);

async function loadMore() {
  apiPhotoService.incrementPage();
  const photos = await apiPhotoService.getPhotos();
  refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(photos));
}
