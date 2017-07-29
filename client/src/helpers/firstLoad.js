import Promise from 'bluebird';
import store from '../store';
import { getLocation } from '../actions/geoAction';
import { imageAction, imageIsFetched, fetchPhotoFromRadius, mapPhotoIsFetched } from '../actions/imageAction';

export default store.dispatch((dispatch) => {
  return new Promise((resolve, reject) => {
    resolve(dispatch(getLocation()));
  }).then(() => {
    return dispatch(imageAction({ location: store.getState().location, max: 20 }));
  }).then(() => {
    return dispatch(fetchPhotoFromRadius(50, { location: store.getState().location }));
  }).then(() => {
    return dispatch(imageIsFetched(true));
  }).then((data) => {
    return dispatch(mapPhotoIsFetched(true));
  }).catch(error => console.log('error: ', error));
});
