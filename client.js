'use strict';

const connection = require('socket.io-client')('http://localhost:3000');
const readline = require('readline');
const util = require('util');

const EOL = require('os').EOL;

connection.on('message', function({ body }) {
  writeLine('* Server says: %s', body);
});

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