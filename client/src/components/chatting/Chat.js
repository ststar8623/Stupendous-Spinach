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
      input: '',
      sendUser: null,
      receiveUser: null
    };
    this.socket = io.connect(`${location.protocol}`);
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
  }

  componentWillMount() {
    this.props.urlAction('chat');
    let logedUser = parseInt(document.getElementById('userID').innerHTML);
    this.setState({
      sendUser: logedUser,
      receiveUser: this.props.profile.profileId
    });
    this.handleMessageEvent();
  }

  handleMessageEvent() {
    let that = this;
    let room = this.state.sendUser + '' + this.state.receiveUser;
    this.socket.on('messages', (inboundMessage) => {
      that.props.newMessage(inboundMessage);
    });
    this.socket.emit('fetchMessages', this.state.receiveUser);
  }

  handleOnChange(e) {
    this.setState({ input: e.target.value });
  }

  handleOnSubmit(e) {
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
    messages: state.messages,
    profile: state.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ newMessage, urlAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);