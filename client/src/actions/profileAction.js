import axios from 'axios';
export const getPhotosOfUser = (userId, callback) => {
  let data = new Promise((resolve, reject) => {
    return axios.get(`/api/profilePhotos/${userId}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log(err); 
      });
  });

  return {
    type: 'PROFILE_PHOTO',
    payload: data
  };
};

export const viewProfile = (userId, callback) => {
  let data = new Promise((resolve, reject) => {
    return axios.get(`/api/profilepage/${userId}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log(err); 
      });
  });
  
  return {
    type: 'PROFILE_INFO',
    payload: data
  };
};

export const setUserId = (userId) => {
  return {
    type: 'SET_USER_ID',
    payload: userId
  };
};

export const profileIsFetched = (boolean) => {
  return {
    type: 'PROFILE_ISFETCHED',
    payload: boolean
  };
};