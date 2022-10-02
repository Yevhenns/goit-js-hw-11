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

import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.PER_PAGE = 40;
  }
  async fetchGallery() {
    const axiosOptions = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '30263360-410abfd80804834cbd5c2123c',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: `${this.PER_PAGE}`,
      },
    };
    try {
      const response = await axios(axiosOptions);

      const data = response.data;
      // console.log(data)
      this.incrementPage();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  resetEndOfHits() {
    this.endOfHits = false;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
