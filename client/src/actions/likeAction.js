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
export const incrementComment = (id, object, index, callback) => {
  let data = new Promise((resolve, reject) => {
    return axios.post(`/api/saveComment/${id}`, object)
      .then(res => {
        console.log('Successfully saved comment');
        callback();
      });
  });
  return {
    type: 'INCREMENT_COMMENT',
    index
  };
};

//remove comment
export const decrementComment = (index, commentId, callback) => {
  let data = new Promise((resolve, reject) => {
    return axios.put(`/api/removeComment/${commentId}`)
      .then(res => {
        console.log('Successfully decrement comments');
        callback();
      })
      .catch(err => {
        console.log(err); 
      });
  });

  return {
    type: 'REMOVE_COMMENT',
    index
  };
};