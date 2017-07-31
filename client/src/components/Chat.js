import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
let socket = io('http://localhost:3000');
import { newMessage } from '../actions/msgAction';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this._handleMessageEvent = this._handleMessageEvent.bind(this);
  }

  componentDidMount() {
    this._handleMessageEvent();
  }

  _handleMessageEvent() {
    let that = this;
    socket.on('messages', (inboundMessage) => {
      console.log('inboundMessage ', inboundMessage);
      that.props.newMessage(inboundMessage);
    });
    socket.emit('fetchMessages');
  }

  handleOnChange(e) {
    this.setState({ input: e.target.value });
  }

  handleOnSubmit(e, callback) {
    e.preventDefault();
    socket.emit('sendMessages', { text: this.state.input });
    this.setState({ input: '' });
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="messageBox">
        <h3>Messages:</h3>
        { messages.map((message, i) => {
          return (
            <p key={i}>{ message.text }</p>
          );
        })}
        <form onSubmit={this.handleOnSubmit.bind(this)}>
          <input type="text" value={this.state.input} onChange={this.handleOnChange.bind(this)}/>
          <button type="submit" onClick={this.handleOnSubmit.bind(this)}>Submit</button>
        </form>
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