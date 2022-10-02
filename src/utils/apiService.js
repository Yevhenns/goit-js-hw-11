// import axios from 'axios';

// const agent = axios.create({
//   baseURL: 'https://pixabay.com/api',
//   params: {
//     key: '30263360-410abfd80804834cbd5c2123c',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page: 40,
//   },
// });

// export default class apiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }
//   async getPhotos() {
//     const {
//       data: { hits },
//     } = await agent.get(`?q=${this.searchQuery}&page=${this.page}`);
//     if (!hits.length) {
//       throw new Error();
//     }
//     return hits;
//   }
//   get query() {
//     return this.searchQuery;
//   }
//   set query(newSearchQuery) {
//     this.searchQuery = newSearchQuery;
//   }
//   incrementPage() {
//     this.page += 1;
//   }
// }
