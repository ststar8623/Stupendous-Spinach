'use strict';
const app = require('./app');
const db = require('../db');
const config = require('config')['knex'];
const config2 = require('config')['passport'];
const PORT = process.env.PORT || 3000;

//environment is set in the package.json scripts
console.log('the current environment is: ', app.get('env'));

const server = app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

const io = require('socket.io').listen(server);

io.on('connection', function(socket) {
  console.log('a user has connected');
  socket.on('chat message', message => {
    socket.broadcast.emit('chat message', message);
  });
  socket.on('subscribe', channel => {
    console.log('a user subscribed to channel: ', channel);
    socket.join(channel);
  });
  socket.on('unsubscribe', channel => {
    socket.leave(channel);
  });
});