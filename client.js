'use strict';

const connection = require('socket.io-client')('http://localhost:3000');
const readline = require('readline');
const util = require('util');

const EOL = require('os').EOL;

connection.on('message', function({ from, body }) {
  writeLine('%s: %s', from, body);
});

connection.on('login', function({ result }) {
  if (result === true) {
    writeLine('* Successfully logged in.');
  } else {
    writeLine('* Failed to log in.')
  }
})

connection.emit('login', {
  login: 'user-' + Math.round(Math.random() * 100),
  password: ''
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('> ');
rl.prompt();

rl.on('line', function(line) {
  connection.emit('message', { body: line });
  rl.prompt();
})

function writeLine(line, ...args) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(util.format(line, ...args) + EOL);
  rl.prompt(true);
}