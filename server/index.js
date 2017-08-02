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

let users = {};
let messages = [];
io.sockets.on('connection', function(socket) {
  console.log('a user has connected');

  socket.on('join room', (data) => {
    socket.join(data);
    console.log('joined room ' + data);
  });

  socket.on('fetchMessages', (obj) => {
    let { user_id, receive_id } = obj;

    controllers.Chats.fetchMessages(obj)
      .then(data => {
        messages = data;
      })
      .then(() => {
        io.emit('messages', messages);
      });
  });

  socket.on('sendMessages', (obj) => {
    let { user_id, receive_id } = obj;
    controllers.Chats.saveMessages(obj);
    messages.push(obj);

    io.emit('messages', messages);
  });
});