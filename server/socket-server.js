// const io = require('./index.js');

// let messages = [{text: 'hi'}, {text: 'this is socket io'}, {text: 'how can i help u'}];
// var sendMessages = (socket) => {
//   socket.emit('messages', messages);
// };

// io.sockets.on('connection', function(socket) {
//   console.log('a user has connected');
  


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

// module.exports = socket;