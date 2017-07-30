import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';

class Rooms extends Component {
  render() {
    return (
      <div>
        ROOMS
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rooms: state.messages.rooms
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);