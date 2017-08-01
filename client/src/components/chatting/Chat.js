import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newMessage } from '../../actions/msgAction';
import { urlAction } from '../../actions/urlAction';
import io from 'socket.io-client';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      sendId: null,
      receiveId: null
    };
    this.socket = io.connect('http://localhost:3000');
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
  }

  componentWillMount() {
    this.props.urlAction('chat');
    let userId = parseInt(document.getElementById('userID').innerHTML);
    this.setState({
      sendId: userId,
      receiveId: this.props.profile.profileId
    }, () => {
      this.socket.emit('fetchMessages', this.state);
    });
    this.handleMessageEvent();
  }

  handleMessageEvent() {
    this.socket.on('messages', (inboundMessage) => {
      console.log('inboundMessage ', inboundMessage);
      this.props.newMessage(inboundMessage);
    });
  }

  handleOnChange(e) {
    this.setState({ text: e.target.value });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.socket.emit('sendMessages', this.state);
    this.setState({ text: '' });
  }

  render() {
    const { messageArray } = this.props.messages;
    const messages = messageArray.map((message, i) => {
      const receivedUser = message.receive_id === this.props.profileId;

      return (
        <li className={receivedUser ? 'comments-li floatRight' : 'comments-li'} key={i}>
          <div>
            <img src={receivedUser ? message.receive_photo : message.send_photo} className="comments-icon" />
            <span className="comment-combined">
              <strong>{receivedUser ? message.receive_first : message.send_first}</strong> &nbsp;
              {message.text}
            </span>
          </div>
        </li>
      );
    });
    return (
      <div className="chat-component">
        <div>
          <ul className="comments-Ul">
            { messages }
          </ul>
        </div>
        <form onSubmit={this.handleOnSubmit.bind(this)} className="comments-form">
          <input placeholder="What SUP!..." type="text" value={this.state.text} onChange={this.handleOnChange.bind(this)} className="comments-input"/>
          <span className="comments-button glyphicon glyphicon-ok" type="submit" onClick={this.handleOnSubmit.bind(this)}></span>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    receiveUser: state.profile.profileUrl
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ newMessage, urlAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);