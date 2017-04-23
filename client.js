const connection = require('socket.io-client')('http://localhost:3000');

connection.on('message', function(message) {
  console.log('* Server says: %s', message.body);
});