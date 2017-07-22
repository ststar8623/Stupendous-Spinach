import axios from 'axios';

export const axiosAction = (call, api, object, callback) => {
  if (object) {
    axios[call](api, object)
      .then(response => {
        callback(response);
      });
  } else {
    axios[call](api)
      .then(response => {
        callback(response);
      });
  }
};