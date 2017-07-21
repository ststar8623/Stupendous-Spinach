const ALL_PHOTOS = 'ALL_PHOTOS';

export const imageAction = (photoArray) => {
  console.log('image action ', photoArray);
  return {
    type: ALL_PHOTOS,
    payload: photoArray
  };
};

export const imageStoreAction = (url) => {
  return {
    type: 'IMAGE_UPLOAD',
    payload: url
  };
};