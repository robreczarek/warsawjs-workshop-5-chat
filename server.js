var io = require('socket.io')(3000);

io.on('connection', function (socket) {
  socket.emit('message', { body: 'Hello, client! Now, to the moon!' });
});