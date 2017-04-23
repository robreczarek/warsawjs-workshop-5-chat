'use strict';

class ChatServer {

  constructor({ io, authentication }) {
    this._io  = io;
    this._authentication = authentication;
  }

  init() {
    const io = this._io;
    const authentication = this._authentication;

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

      socket.on('disconnect', function(socket) {
        console.log('User Logged out.');
        
      });

      socket.on('login', function({ login, password }) {

        authentication.validate(login, password)
        .then(function validationFinished(result) {
          if (result) {
            socket.emit('login', { result: true });
            clientData = { login, password };
            console.log('Logged in: %s', login);
          } else {
            socket.emit('login', { result: false });
          }
        })
        .catch(function validationError(error) {
          socket.emit('login', { result: false, error: error });
        })
      });
      
    });

  }

}

module.exports = ChatServer;