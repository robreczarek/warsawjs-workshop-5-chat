const level = require('level');
const thenLevelUp = require('then-levelup');
const bcrypt = require('bcrypt');

const ITERATIONS = 12;

class LevelAuthentication {
  constructor({ path }) {
    this._db = thenLevelUp(level(path));
  }

  validate(login, password) {
    return this._db.get(login).then(function(passwordHash) {
      return bcrypt.compare(password, passwordHash).then(function(passwordsMatch) {
        return Promise.resolve(passwordsMatch);
      });
    }, function(error) {
      return false;
    });
  }

  register(login, password) {
    const db = this._db;
    return bcrypt.hash(password, ITERATIONS).then(function(passwordHash) {
      return db.put(login, passwordHash);
    });
  }
}

module.exports = LevelAuthentication;