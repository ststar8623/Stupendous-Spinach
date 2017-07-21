export const imageAction = (photoArray) => {
  return {
    type: 'ALL_PHOTOS',
    payload: photoArray
  };
};

export const imageStoreAction = (url) => {
  return {
    type: 'IMAGE_UPLOAD',
    payload: url
  };
};

export const imageIsFetched = (boolean) => {
  return {
    type: 'IMAGE_ISFETCHED',
    payload: boolean
  };
};

export const currentPhotoAction = (comments) => {
  return {
    type: 'CURRENT_PHOTO_COMMENTS',
    payload: comments
  };
};