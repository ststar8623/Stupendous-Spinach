const io = require('socket.io');
 
const socket = function (server) {
  const socketServer = io(server);
  const connections = [];
 
  
};

module.exports = socket;