import axios from 'axios';
import Promise from 'bluebird';
// increment likes
export const increment = (id, index) => {
  let data = new Promise((resolve, reject) => {
    return axios.post(`/api/addlike/${id}`)
      .then(res => {
        console.log('Successfully increment likes');
      });
  });
  return {
    type: 'INCREMENT_LIKES',
    index
  };
};

export const decrement = (id, index) => {
  let data = new Promise((resolve, reject) => {
    return axios.put(`/api/removelike/${id}`)
      .then(res => {
        console.log('Successfully decrement likes');
      });
  });
  return {
    type: 'DECREMENT_LIKES',
    index
  };
};

// add comments
export const incrementComment = (index) => {
  return {
    type: 'INCREMENT_COMMENT',
    index
  };
};

export const addComment = (comment) => {
  return {
    type: 'ADD_COMMENT',
    payload: comment
  };
};