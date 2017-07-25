import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from './Main';

const mapStateToProps = (state) => {
  return {
    photoArray: state.photoArray,
    mapPhoto: state.mapPhoto.allPhotoFromRadius,
    currentPhoto: state.currentPhoto.current,
    geoLocation: state.geoLocation,
    upload: state.upload.url
  };
};

const App = connect(mapStateToProps)(Main);

export default App;