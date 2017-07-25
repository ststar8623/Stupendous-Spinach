import axios from 'axios';

// export const nearbyPhoto = (object, callback) => {
//   axios.post('/api/nearbyPhotos', object)
//     .then(res => {
//       callback(res);
//     });
// };

// export const mapPhotosWithRadius = (radius, object, callback) => {
//   axios.post(`/api/mapPhotos/${radius}`, object)
//     .then(res => {
//       callback(res);
//     });
// };

// export const getAllComments = (postId, callback) => {
//   axios.get(`/api/getAllComments/${postId}`)
//     .then(res => {
//       callback(res);
//     });
// };

export const saveComment = (postId, object, callback) => {
  axios.post(`/api/saveComment/${postId}`, object)
    .then(res => {
      callback(res);
    });
};

export const imageUpload = (object, callback) => {
  axios.post('/api/imageUpload', object)
    .then(res => {
      callback(res);
    });
}

export const axiosAction = (call, api, callback) => {
  axios[call](api)
    .then(response => {
      callback(response);
    });
};