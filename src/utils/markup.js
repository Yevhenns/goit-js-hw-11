// import { getPhotos } from './apiService';

export function createGalleryMarkup(photos) {
  return photos
    .map(
      ({
        webformatURL,
        largeImageURLtags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a fref="${largeImageURLtags}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
        </a>
  </div>`;
      }
    )
    .join('');
}
