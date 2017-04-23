'use strict';

class ChatServer {
  constructor({ io }) {
    this._io  = io;
  }

  init() {
    const io = this._io;

    io.on('connection', function (socket) {

      let login = null;

      socket.on('message', function( { body } ) {
        io.sockets.emit('message', { body });
      });
      
    });
  }
  
}

module.exports = ChatServer;