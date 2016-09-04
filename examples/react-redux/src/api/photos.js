export const fetchPhotos = () => {
  return fetch('http://jsonplaceholder.typicode.com/photos/', {
    method: 'get'
  });
};
