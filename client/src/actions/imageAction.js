const ALL_PHOTOS = 'ALL_PHOTOS';

export const imageAction = (photoArray) => {
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

export const imageIsFetched = (boolean) => {
  return {
    type: 'IMAGE_ISFETCHED',
    payload: boolean
  }
}