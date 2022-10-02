// export function createGalleryMarkup(photos) {
//   return photos
//     .map(
//       ({
//         webformatURL,
//         largeImageURLtags,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<div class="photo-card">
//         <a fref="${largeImageURLtags}">
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//           <div class="info">
//             <p class="info-item">
//               <b>Likes ${likes}</b>
//             </p>
//             <p class="info-item">
//               <b>Views ${views}</b>
//             </p>
//             <p class="info-item">
//               <b>Comments ${comments}</b>
//             </p>
//             <p class="info-item">
//               <b>Downloads ${downloads}</b>
//             </p>
//           </div>
//         </a>
//   </div>`;
//       }
//     )
//     .join('');
// }

export default function renderCard(data) {
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
