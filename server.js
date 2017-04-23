'use strict';
// Util realated
const yaml = require('js-yaml');
const fs   = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./config/server.yaml', 'utf8'));

// Server related
const io = require('socket.io')(config.socketPort);
const ChatServer = require('./lib/ChatServer');
const Authentication = require('./lib/Authentication');

const authentication = new Authentication({
  users: {
    user1: 'pass1',
    user2: 'pass2',
    user3: 'pass3'
  }
})

// Create server instance and start
const server = new ChatServer({ io, authentication });
server.init();
