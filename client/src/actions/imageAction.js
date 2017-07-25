import axios from 'axios';
import Promise from 'bluebird';

export const imageAction = (object) => {
  let data = new Promise((resolve, reject) => {
    return axios.post('/api/nearbyPhotos', object)
      .then(res => {
        resolve(res.data);
      });
  });
  return {
    type: 'ALL_PHOTOS',
    payload: data
  };
};

export const imageStoreAction = (url) => {
  return {
    type: 'IMAGE_UPLOAD',
    payload: url
  };
};

export const currentPhotoAction = (postId) => {
  let data = new Promise((resolve, reject) => {
    return axios.get(`/api/getAllComments/${postId}`)
      .then(res => {
        resolve(res.data);
      });
  });
  return {
    type: 'CURRENT_PHOTO_COMMENTS',
    payload: data,
    isFetched: true
  };
};

export const fetchPhotoFromRadius = (radius, object) => {
  let data = new Promise((resolve, reject) => {
    return axios.post(`/api/mapPhotos/${radius}`, object)
      .then(res => {
        resolve(res.data);
      });
  });
  return {
    type: 'FETCH_PHOTO_FROM_RADIUS',
    payload: data
  };
};

export const imageIsFetched = (boolean) => {
  return {
    type: 'IMAGE_ISFETCHED',
    payload: boolean
  };
};

export const currentIsFetched = (boolean) => {
  return {
    type: 'CURRENT_ISFETCHED',
    payload: boolean
  };
};

export const mapPhotoIsFetched = (boolean) => {
  return {
    type: 'MAP_PHOTO_ISFETCHED',
    payload: boolean
  };
};