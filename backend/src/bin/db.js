import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import autoBind from 'auto-bind';
import User from './struct/user';

const RET = {
  UNKNOWN: { code: -1, msg: 'unauthorized' },
  OK: { code: 0, msg: 'OK' },
  USER_NOT_FOUND: { code: 1, msg: 'user not found' },
  USER_ALREADY_EXISTS: { code: 2, msg: 'user already exists' },
  EMAIL_ALREADY_IN_USE: { code: 3, msg: 'email address already in use' },
  PHONE_ALREADY_IN_USE: { code: 4, msg: 'phone number already in use' },
};

class Database {
  static getDefaults() {
    return {
      users: [
        new User('admin', 1, '$2b$10$gBUmQdmfX.xJIjhmGTzrn.arOPJtss1CT.I2CvGidA0zbX1m6f/nS', 'test name', 'email', 'phone', true),
      ],
      game: {
        in_progress: false,
        teams: [
          {
            name: 'test team',
            users: ['admin'],
          },
        ],
      },
    };
  }

  constructor(path) {
    this.adapter = new FileSync(path);
    this.db = low(this.adapter);
    this.db.defaults(Database.getDefaults()).write();
    autoBind(this);
  }

  verifyUser(username) {
    return this._setUserProperty(username, 'verified', true);
  }

  deverifyUser(username) {
    return this._setUserProperty(username, 'verified', false);
  }

  promoteUser(username) {
    return this._setUserProperty(username, 'perm', 1);
  }

  demoteUser(username) {
    return this._setUserProperty(username, 'perm', 0);
  }

  getUser(username) {
    return this._getUserSanitary(username);
  }

  addUser(username, password, name, email, phone, verified) {
    if (this._keyExists('users', 'username', username)) return RET.USER_ALREADY_EXISTS;
    if (this._keyExists('users', 'email', email)) return RET.EMAIL_ALREADY_IN_USE;
    if (this._keyExists('users', 'phone', phone)) return RET.PHONE_ALREADY_IN_USE;
    const user = new User(username, 0, password, name, email, phone, verified);
    this.db.get('users')
      .push(user)
      .write();
    return RET.OK;
  }

  removeUser(username) {
    this.db.get('users').remove((n) => n.username === username).write();
  }

  getGameData() {
    return this.db.get('game').value();
  }

  getUsers() {
    return this.db.get('users').value();
  }

  _setUserProperty(username, prop, val) {
    const user = this._getUser(username);
    if (undefined === user.value()) return RET.USER_NOT_FOUND;
    user.set(prop, val).write();
    return RET.OK;
  }

  _getUserSanitary(username) {
    const u = this._getUser(username).value();
    if (undefined === u) return RET.USER_NOT_FOUND;
    return u;
  }

  _getUser(username) {
    return this.db.get('users').find(['username', username]);
  }

  _keyExists(set, key, val) {
    return undefined === this.db.get(set).find([key, val]).value();
  }
}

export default Database;
export { RET };
