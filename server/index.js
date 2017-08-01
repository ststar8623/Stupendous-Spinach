'use strict';
const app = require('./app');
const db = require('../db');
const config = require('config')['knex'];
const config2 = require('config')['passport'];
const PORT = process.env.PORT || 3000;
const controllers = require('./controllers');
//environment is set in the package.json scripts
console.log('the current environment is: ', app.get('env'));

const server = app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

const io = require('socket.io').listen(server);

// module.exports = io;
// let sockets = {};

// let messages = [{text: 'hi'}, {text: 'this is socket io'}, {text: 'how can i help u'}];
// var sendMessages = (socket) => {
//   socket.emit('messages', messages);
// };

let messages = {};
let sendUser, receiveUser;
io.sockets.on('connection', function(socket) {

  console.log('a user has connected');

  socket.on('fetchMessages', (obj) => {
    // go to database
    let { send_id, receive_id } = obj;

    let combineId = send_id < receive_id ? `${send_id}` + `${receive_id}` : `${receive_id}` + `${send_id}`;

    controllers.Chats.fetchMessages(obj)
      .then(data => {
        messages[combineId] = data;
        // io.emit('messages', messages);
      })
      .then(() => {
        io.emit('messages', messages[combineId]);
      });
    // get all message between users
    // and send it back to client
  });

  socket.on('sendMessages', (obj) => {
    let { send_id, receive_id } = obj;

    let combineId = send_id < receive_id ? `${send_id}` + `${receive_id}` : `${receive_id}` + `${send_id}`;
    
    controllers.Chats.saveMessages(obj);
    // messages.push(obj);
    // io.emit('messages', obj);
    messages[combineId].push(obj);
    io.emit('messages', messages[combineId]);
  });
});

