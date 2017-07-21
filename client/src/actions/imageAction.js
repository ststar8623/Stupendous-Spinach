const ALL_PHOTOS = 'ALL_PHOTOS';

export const imageAction = (photoArray) => {
  console.log('image action ', photoArray);
  return {
    type: ALL_PHOTOS,
    payload: photoArray
  };
};