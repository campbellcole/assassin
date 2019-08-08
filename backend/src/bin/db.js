import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import User from './struct/user';
import autoBind from 'auto-bind';

const RET = {
  OK: { code: 0, msg: "OK" },
  USER_NOT_FOUND: { code: 1, msg: "user not found" },
  USER_ALREADY_EXISTS: { code: 2, msg: "user already exists" },
  EMAIL_ALREADY_IN_USE: { code: 3, msg: "email address already in use" },
  PHONE_ALREADY_IN_USE: { code: 4, msg: "phone number already in use" }
}

class Database {

  constructor(path) {
    this.adapter = new FileSync(path);
    this.db = low(this.adapter);
    this.db.defaults(this.getDefaults()).write();
  }

  getDefaults() {
    return {
      users: [
        new User('admin', '$2b$10$gBUmQdmfX.xJIjhmGTzrn.arOPJtss1CT.I2CvGidA0zbX1m6f/nS', 'test name', 'email', 'phone', true)
      ],
      game: {
        in_progress: false,
        teams: [
          {
            name: 'test team',
            users: [ 'admin' ]
          }
        ]
      }
    }
  }

  verifyUser(username) {
    var user = this.getUser(username);
    if (RET.USER_NOT_FOUND !== user) {
      this.db.get('users')
             .find(['username', username])
             .set('verified', true)
             .write();
      return RET.OK;
    } else return RET.USER_NOT_FOUND;
  }

  deverifyUser(username) {
    var user = this.getUser(username);
    if (RET.USER_NOT_FOUND !== user) {
      this.db.get('users')
             .find(['usernane', username])
             .set('verified', false)
             .write();
      return RET.OK
    } else return RET.USER_NOT_FOUND;
  }

  userExists(username) {
    if (undefined !== this._getUser(username)) return RET.OK;
    else return RET.USER_NOT_FOUND;
  }

  getUser(username) {
    var u = this._getUser(username);
    if (undefined === u) return RET.USER_NOT_FOUND;
    else return u;
  }

  _getUser(username) {
    return this.db.get('users').find(['username', username]).value();
  }

  addUser(username, password, name, email, phone, verified) {
    if (RET.OK === this.userExists(username)) return RET.USER_ALREADY_EXISTS;
    if (undefined !== this.db.get('users').find(['email', email]).value()) return RET.EMAIL_ALREADY_IN_USE;
    if (undefined !== this.db.get('users').find(['phone', phone]).value()) return RET.PHONE_ALREADY_IN_USE;
    var user = new User(username, password, name, email, phone, verified);
    this.db.get('users')
           .push(user)
           .write();
    return RET.OK;
  }

  getGameData() {
    return this.db.get('game').value();
  }

  getUsers() {
    return this.db.get('users').value();
  }

}

export default Database;
export { RET };
