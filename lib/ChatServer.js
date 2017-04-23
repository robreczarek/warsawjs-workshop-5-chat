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

      socket.on('disconnect', function(reason) {
        const message = `${clientData.login} has logged out.`;

        console.log(message);
        io.sockets.emit('message', { body: message, from: 'Server' });
      });

      socket.on('login', function({ login, password }) {

        authentication.validate(login, password)
        .then(function validationFinished(result) {
          if (result) {
            socket.emit('login', { result: true });
            clientData = { login, password };
            io.sockets.emit('message', { body: login + ' has logged in.', from: 'Server' });
            console.log('Logged in: %s', login);
          } else {
            socket.emit('login', { result: false });
          }
        })
        .catch(function validationError(error) {
          socket.emit('login', { result: false, error: error });
        })
      });

      socket.on('message', function( { body } ) {
        
        if (clientData.login) {
          io.sockets.emit('message', { body, from: clientData.login });
        }
        
      });

      socket.on('registration', function({ login, password }) {
        let registration = authentication.register(login, password);

        if (registration) {
          console.log('User was created.');
        } else {
          console.log('User was not created.');
        }
      });
      
      socket.on('unregistration', function({ login, password }) {
        let unregister = authentication.unregister(login, password);

        if (unregister) {
          console.log('User was removed.');
        } else {
          console.log('User was not removed.');
        }
      });
      
    });

  }

}

module.exports = ChatServer;