import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { newMessage } from '../../actions/msgAction';
import { urlAction } from '../../actions/urlAction';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.socket = io('/');
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this._handleMessageEvent = this._handleMessageEvent.bind(this);
  }

  componentDidMount() {
    this.props.urlAction('chat');
    // let logedUser = parseInt(document.getElementById('userID').innerHTML);
    // this.socket.emit('join', logedUser);
    this._handleMessageEvent();
  }

  _handleMessageEvent() {
    let that = this;
    this.socket.on('messages', (inboundMessage) => {
      console.log('inboundMessage ', inboundMessage);
      that.props.newMessage(inboundMessage);
    });
    this.socket.emit('fetchMessages');
  }

  handleOnChange(e) {
    this.setState({ input: e.target.value });
  }

  handleOnSubmit(e, callback) {
    e.preventDefault();
    this.socket.emit('sendMessages', { text: this.state.input });
    this.setState({ input: '' });
  }

  render() {
    const { messageArray } = this.props.messages;
    return (
      <div className="comments-component">
        <h3>Messages:</h3>
        { messageArray.map((message, i) => {
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
  return bindActionCreators({ newMessage, urlAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);