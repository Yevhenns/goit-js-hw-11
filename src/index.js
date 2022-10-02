// import apiService from './utils/apiService';
// import { createGalleryMarkup } from './utils/markup';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { Notify } from 'notiflix';

// const refs = {
//   form: document.querySelector('#search-form'),
//   input: document.querySelector('[name="searchQuery"]'),
//   btn: document.querySelector('[type="submit"]'),
//   gallery: document.querySelector('.gallery'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };

// const lightbox = new SimpleLightbox('.gallery a', {
//   captions: true,
//   captionPosition: 'bottom',
//   captionDelay: 250,
//   animationSpeed: 250,
// });
// console.log(lightbox);

// const apiPhotoService = new apiService();

// refs.form.addEventListener('submit', onFormSubmit);

// async function onFormSubmit(evt) {
//   evt.preventDefault();

//   const searchQuery = evt.currentTarget.searchQuery.value;

//   apiPhotoService.query = searchQuery;
//   apiPhotoService.page = 1;
//   try {
//     const photos = await apiPhotoService.getPhotos();
//     refs.gallery.innerHTML = createGalleryMarkup(photos);
//     lightbox.refresh();
//   } catch (err) {
//     console.log(err);
//   }
// }

// refs.loadMoreBtn.addEventListener('click', loadMore);

// async function loadMore() {
//   apiPhotoService.incrementPage();
//   const photos = await apiPhotoService.getPhotos();
//   refs.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(photos));
//   lightbox.refresh();
// }
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const galleryCard = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSubmitForm);
loadMoreBtn.addEventListener('click', onLoadMore);

let searchValue = '';
let pageNumber = 1;
loadMoreBtn.hidden = true;

function onSubmitForm(e) {
  e.preventDefault();
  loadMoreBtn.hidden = false;

  clearGallaryCard();
  searchValue = e.currentTarget.elements.searchQuery.value;

  if (searchValue === '') {
    loadMoreBtn.hidden = true;
    return Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  pageNumber = 1;
  fetchInfo().then(renderImage);
}

function onLoadMore() {
  fetchInfo()
    .then(renderImage)
    .catch(data => {
      loadMoreBtn.hidden = true;
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    });
}

async function fetchInfo() {
  const url = `https://pixabay.com/api/`;

  return await axios
    .get(url, {
      params: {
        key: '30165080-69dc7af91b4e9c1a4c0e45d49',
        q: `${searchValue}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page: `${pageNumber}`,
      },
    })

    .then(res => {
      pageNumber += 1;

      if (res.data.totalHits === 0) {
        loadMoreBtn.hidden = true;
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (pageNumber === 2 && res.data.totalHits > 0) {
        Notiflix.Notify.success(
          `Hooray! We found ${res.data.totalHits} images.`
        );
      }

      return res.data;
    });
}

function renderImage(data) {
  const card = data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
    <div class="photo-card">
        <a class="gallery-link" href="${largeImageURL}">
   <img src="${webformatURL}" alt="${tags}"  loading="lazy" /></a>
  <div class="info">
     <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
       <b>Views ${views}</b>
     </p>
     <p class="info-item">
       <b>Comments ${comments}</b>
     </p>
    <p class="info-item">
       <b>Downloads ${downloads}</b>
     </p>
     </div>
   </div>`;
      }
    )
    .join('');

  galleryCard.insertAdjacentHTML('beforeend', card);

  let galleryEl = new SimpleLightbox('.gallery a', {});
  galleryEl.on(('show.simplelightbox', function () {}));
}

function clearGallaryCard() {
  galleryCard.innerHTML = '';
}
