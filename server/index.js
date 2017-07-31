'use strict';
const app = require('./app');
const db = require('../db');
const config = require('config')['knex'];
const config2 = require('config')['passport'];
const PORT = process.env.PORT || 3000;
const fs = require('fs');

//environment is set in the package.json scripts
console.log('the current environment is: ', app.get('env'));

const server = app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

const io = require('socket.io').listen(server);

let messages = [{text: 'hi'}, {text: 'this is socket io'}, {text: 'how can i help u'}];
var sendMessages = (socket) => {
  socket.emit('messages', messages);
};

io.on('connection', function(socket) {
  console.log('a user has connected');

  socket.on('fetchMessages', () => {
    sendMessages(socket);
  });

  socket.on('sendMessages', (message) => {
    messages.push(message);
    io.emit('messages', messages);
  });
});