class Authentication {
  constructor({ users }) {

    /**
      * A map of login => password(plaintext).
      * @type {Map.<string,string>}
    */
    this._userPasswords = new Map();

    Object.keys(users).forEach(function(login) {
      this._userPasswords.set(login, users[login]);
    }, this);
  }


  /**
    * Check whether a user's stored password matches the ones passed.
    * If the user does not exist, the result is the same as if the password
    * that was pass was incorrect.
    * @param {string} login - The user login to check the password for.
    * @param {string} password - The password to verify
    * @param {Promise.<boolean>} - A promise that fulfills with a boolean 
    * saying whether the password was correct. Rejects only if an error 
    * occurred during the check.
  */
  validate(login, password) {
    if (this._userPasswords.has(login) && this._userPasswords.get(login) === password) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }
}

module.exports = Authentication;