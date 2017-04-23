const level = require('level');
const thenLevelUp = require('then-levelup');
const bcrypt = require('bcrypt');

class LevelAuthentication {
  constructor({ path }) {
    this._db = thenLevelUp(level(path));
  }

  validate(login, password) {
    return this._db.get(login).then(function(passwordHash) {
      return bcrypt.compare(password, passwordHash).then(function(passwordsMatch) {
        return Promise.resolve(passwordsMatch);
      });
    });
  }
}

module.exports = LevelAuthentication;