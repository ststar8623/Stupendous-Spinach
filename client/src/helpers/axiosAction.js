import axios from 'axios';

export const axiosAction = (call, api, object, callback) => {
  axios[call](api, object)
    .then(response => {
      callback(response);
    });
};