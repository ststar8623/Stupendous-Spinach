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

export const setUserProfile = (url, first) => {
  return {
    type: 'SET_USER_PROFILE_PIC',
    payload: {
      url,
      first
    }
  };
};

export const setSendUserProfile = (userId) => {
  let data = new Promise((resolve, reject) => {
    return axios.get(`/api/profilepage/${userId}`)
      .then(res => {
        resolve(res.data.profile);
      })
      .catch(err => {
        console.log(err); 
      });
  });

  return {
    type: 'SET_SEND_PROFILE',
    payload: data
  };
};

export const setMyId = () => {
  let data = new Promise((resolve, reject) => {
    return axios.get('/api/whatIsMyID')
      .then((res) => {
        resolve(res.data.yourID);
      })
      .catch(err => {
        console.log(err);
      });
  });
  console.log(data);
  return {
    type: 'SET_MY_ID',
    payload: data
  };
};