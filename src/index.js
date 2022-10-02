import './sass/index.scss';

import NewsApiService from './utils/apiService';
import renderCard from './utils/markup';
//import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.classList.add('is-hidden');

let isShown = 0;
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// Бесконечного скролла
const options = {
  rootMargin: '50px',
  root: null,
  threshold: 0.3,
};
const observer = new IntersectionObserver(onLoadMore, options);
//observer.observe(refs.loadMoreBtn);

//////---- FUNCTION ----////
function onSearch(e) {
  e.preventDefault();

  refs.galleryContainer.innerHTML = '';
  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  newsApiService.resetPage();

  if (newsApiService.query === '') {
    Notify.warning('Please, fill the main field');
    return;
  }

  isShown = 0;
  fetchGallery();
  onRenderGallery(hits);

  ///// если нужен бесконечній скролл добавляем ст.48
  //observer.observe(refs.loadMoreBtn);
}

function onLoadMore() {
  newsApiService.incrementPage();
  fetchGallery();
}

async function fetchGallery() {
  // refs.loadMoreBtn.classList.add('is-hidden');

  const r = await newsApiService.fetchGallery();
  const { hits, total } = r;
  isShown += hits.length;

  if (!hits.length) {
    Notify.warning(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }

  onRenderGallery(hits);
  isShown += hits.length;

  if (isShown < total) {
    // Показывае кнопку
    Notify.success(`Hooray! We found ${total} images !!!`);
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
  // Если пользователь дошел до конца коллекции, пряч кнопку и выводи уведомление с текстом:
  if (isShown >= total) {
    Notify.info('We re sorry, but you have reached the end of search results.');
  }
}

// ф-ция рендерит массив (дата) картинок согласно разметки (renderCard)
function onRenderGallery(elements) {
  //console.log(elements);
  const markup = elements
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
        return `<div class="photo-card">
    <a href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
    </div>`;
      }
    )
    .join('');
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
