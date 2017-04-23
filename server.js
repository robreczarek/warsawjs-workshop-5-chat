'use strict';
// Util realated
const yaml = require('js-yaml');
const fs   = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./config/server.yaml', 'utf8'));

// Server related
const io = require('socket.io')(config.socketPort);
const ChatServer = require('./lib/ChatServer');
const Authentication = require('./lib/LevelAuthentication');
const authentication = new Authentication({ path: __dirname + '/users.db'})

// Create server instance and start
const server = new ChatServer({ io, authentication });
server.init();
