import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';

import { urlAction } from '../../actions/urlAction';

class Rooms extends Component {
  componentWillMount() {
    this.props.urlAction('rooms');
  }
  render() {
    return (
      <div className="roomsBox">
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
  return bindActionCreators({ urlAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);