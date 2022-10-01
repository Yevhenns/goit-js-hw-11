import axios from 'axios';

const API_KEY = '30263360-410abfd80804834cbd5c2123c';
const DATA_URL = 'https://pixabay.com/api';

// axios.defaults.baseURL = DATA_URL;

const agent = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '30263360-410abfd80804834cbd5c2123c',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
});

export async function getPhotos(searchQuery, page) {
  const {
    data: { hits },
  } = await agent.get(`?q=${searchQuery}&page=${page}`);
  return hits;
}
