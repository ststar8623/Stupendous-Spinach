import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from './Main';

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    comments: state.comments,
    geoLocation: state.geoLocation,
  };
};

const App = connect(mapStateToProps)(Main);

export default App;