export const fetchPhotos = () => (
  fetch('http://jsonplaceholder.typicode.com/photos/', {
    method: 'get'
  }).then((response) => {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json(response);
  })
);
