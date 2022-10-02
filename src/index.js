import apiService from './utils/apiService';
import { createGalleryMarkup } from './utils/markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  btn: document.querySelector('[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionPosition: 'bottom',
  captionDelay: 250,
  animationSpeed: 250,
});
console.log(lightbox);

const apiPhotoService = new apiService();

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();

  const searchQuery = evt.currentTarget.searchQuery.value;

  apiPhotoService.query = searchQuery;
  apiPhotoService.page = 1;
  try {
    const photos = await apiPhotoService.getPhotos();
    refs.gallery.innerHTML = createGalleryMarkup(photos);
    lightbox.refresh();
  } catch (err) {
    console.log(err);
  }
}

refs.loadMoreBtn.addEventListener('click', loadMore);

async function loadMore() {
  apiPhotoService.incrementPage();
  const photos = await apiPhotoService.getPhotos();
  refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(photos));
  lightbox.refresh();
}
