'use strict';

// Util realated
const yaml = require('js-yaml');
const fs   = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./config/client.yaml', 'utf8'));

const readline = require('readline');
const util = require('util');
const EOL = require('os').EOL;

// ## Socket.io message related ##
const url = `http://${config.server}:${config.socketPort}`;
const connection = require('socket.io-client')(url);

// TODO: Define a variable keeping login/password sent on every connect.

let credentials = {
  login: 'anon-' + Math.round(Math.random() * 100),
  password: null
}

// Fire off a message to the client when they connect
connection.on('connect', function() {
  
  writeLine('* Connected to the chat server.');
  
  if (credentials) {
    sendLogin();
  }

})

// Print a message when it is received from the server
connection.on('message', function({ from, body }) {
  writeLine('%s: %s', from, body);
});

// Login related communication
connection.on('login', function({ result }) {
  if (result === true) {
    writeLine('* Successfully logged in.');
  } else {
    writeLine('* Failed to log in.');
  }
})

function sendLogin() {
  connection.emit('login', credentials);
}


// ## Input handling
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('> ');
rl.prompt();

const commandHandlers = {
  login: function handleLogin(login, password) {
    credentials = { login, password };
    sendLogin();
  },

  showDetails: function() {
    console.log(credentials);
  }
}

rl.on('line', function(line) {
  // Handle /commands instead of sending like normal messages
  if (line[0] === '/') {
    const commandParts = line.slice(1).split(' ').filter((part) => part.length > 0);
    const commandName = commandParts[0];
    const commandArgs = commandParts.slice(1);

    if (commandHandlers[commandName]) {
      commandHandlers[commandName].apply(undefined, commandArgs);
    }
  } else {
    // This is a normal chat message
    connection.emit('message', { body: line });  
  }

  rl.prompt();

})

function writeLine(line, ...args) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(util.format(line, ...args) + EOL);
  rl.prompt(true);
}