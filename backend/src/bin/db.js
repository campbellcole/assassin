import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import User from './struct/user';

const RET = {
  OK: 0,
  USER_NOT_FOUND: 1
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
        new User("admin", "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", "test name", "email", "phone", true)
      ],
      game: {
        in_progress: false,
        teams: [
          {
            name: "test team",
            users: [ "admin" ]
          }
        ]
      }
    }
  }

  verifyUser(username) {
    var user = this.db.get('users')
           .find(['username', username])
           .value();
    if (undefined !== user) {
      this.db.get('users')
             .find(['username', username])
             .set('verified', true)
             .write();
      return RET.OK;
    } else {
      return RET.USER_NOT_FOUND;
    }
  }

  addUser(username, pass, name, email, phone, verified) {
    var user = new User(username, pass, name, email, phone, verified);
    this.db.get('users')
           .push(user)
           .write();
    return RET.OK;
  }

}

export default Database;
