import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import newMessage from '../actions/msgAction';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: ''
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this._handleMessageEvent = this._handleMessageEvent.bind(this);
  }

  // componentDidMount() {
  //   this._handleMessageEvent();
  // }

  _handleMessageEvent() {
    socket.on('chat message', (inboundMessage) => {
      this.props.newMessage({
        user: 'test_user',
        message: 'inboundMessage'
      });
    });
  }

  handleOnChange(e) {
    this.setState({ input: e.target.value });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    socket.emit('chat message', { message: this.state.input });

    this.setState({ input: '' });
  }

  render() {
    // const messages = this.props.messages.map((message, i) => {
    //   return (
    //     <span key={i} >{ message }</span>
    //   );
    // });
    return (
      <div style={{ marginTop: '30px' }}>
        {/* { messages } */}
        HI im chat component
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ newMessage }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);