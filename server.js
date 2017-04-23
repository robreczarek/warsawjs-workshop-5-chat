'use strict';
// Util realated
const yaml = require('js-yaml');
const fs   = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./config/server.yaml', 'utf8'));

// Server related
const io = require('socket.io')(config.socketPort);
const ChatServer = require('./lib/ChatServer');

// Create server instance and start
const server = new ChatServer({ io });
server.init();
