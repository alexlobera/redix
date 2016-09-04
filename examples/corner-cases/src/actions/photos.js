import { fetchPhotos } from '../api/photos'

export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';

export const receivePhotos = (data) => (
  {
    type: RECEIVE_PHOTOS,
    photos: data.slice(0, 50)
  }
);

export const getPhotos = () => fetchPhotos()
  .then(response => response.json())
  .then(receivePhotos)
