import User from './struct/user';
import { db } from '../app';
import { RET } from '../bin/db';

function isLocal(req) {
  return (req.connection.remoteAddress === '127.0.0.1' ||
          req.connection.remoteAddress === '::ffff:127.0.0.1' ||
          req.connection.remoteAddress === '::1');
}

function deserializeUsers() {
  var users = [];
  var serUsers = db.getUsers();
  for (var su of serUsers) {
    var user = new User(
      su.username,
      su.password,
      su.name,
      su.email,
      su.phone,
      su.verified
    );
    users.push(user);
  }
  return users;
}

function deserializeUser(username) {
  var su = db.getUser(username);
  if (RET.USER_NOT_FOUND === su) return su;
  var user = new User(
    su.username,
    su.password,
    su.name,
    su.email,
    su.phone,
    su.verified
  );
  return user;
}

export {
  isLocal,
  deserializeUsers,
  deserializeUser
}
