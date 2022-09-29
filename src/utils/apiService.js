import axios from 'axios';

const API_KEY = '30263360-410abfd80804834cbd5c2123c';
const DATA_URL = 'https://pixabay.com/api';

axios.defaults.baseURL = DATA_URL;

export async function getPhotos(searchQuery, page) {
  const {
    data: { hits },
  } = await axios.get(
    `/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  return hits;
}
