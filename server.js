"use strict";
const io = require('socket.io')(3000);

io.on('connection', function (socket) {

  let login = null;

  socket.on('message', function( { body } ) {
    io.sockets.emit('message', { body });
  });
  
});