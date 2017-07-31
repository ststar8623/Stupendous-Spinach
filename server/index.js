'use strict';
const app = require('./app');
const db = require('../db');
const config = require('config')['knex'];
const config2 = require('config')['passport'];
const PORT = process.env.PORT || 3000;
const socketServer = require('./socket-server.js');
//environment is set in the package.json scripts
console.log('the current environment is: ', app.get('env'));

const server = app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

socketServer(server);

// const io = require('socket.io').listen(server);

// let sockets = {};

// let messages = [{text: 'hi'}, {text: 'this is socket io'}, {text: 'how can i help u'}];
// var sendMessages = (socket) => {
//   socket.emit('messages', messages);
// };

// io.on('connection', function(socket) {
//   console.log('a user has connected');
  
//   socket.on('set user', (user) => {
//     sockets[user] = socket;
//   });

//   socket.on('fetchMessages', (userId) => {
//     // go to database

//     // get all message between users
//     // and send it back to client
//     sendMessages(socket);
//   });

//   socket.on('sendMessages', (message, to) => {
//     // sockets[to].emit(message);
//     messages.push(message);
//     io.emit('messages', messages);
//   });
// });