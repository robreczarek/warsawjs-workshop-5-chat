'use strict';

class ChatServer {

  constructor({ io }) {
    this._io  = io;
  }

  init() {
    const io = this._io;

    io.on('connection', function (socket) {

      socket.emit('message', { body: 'Welcome to the chat server.', from: 'Server' });

      let clientData = {
        login: null
      }

      socket.on('message', function( { body } ) {
        
        if (clientData.login) {
          io.sockets.emit('message', { body, from: clientData.login });
        }
        
      });

      socket.on('login', function({ login, password }) {
        clientData.login = login;

        socket.emit('login', { result: true });

        console.log('Logged in: %s', login);
      });
      
    });

  }

}

module.exports = ChatServer;