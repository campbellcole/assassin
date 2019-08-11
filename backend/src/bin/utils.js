import User from './struct/user';
import { db } from '../app';
import { RET } from '../bin/db';

const LVL = {
  NONE: { code: -1 },
  USER: { code: 0 },
  ADMIN: { code : 1 }
}

function permFromCode(code) {
  var t = Object.keys(LVL).find((elem) => {
    return code === LVL[elem].code;
  });
  return LVL[t];
}

function authLevel(req) {
  if (undefined === req.user) return LVL.NONE.code;
  return req.user.perm;
}

function deserializeUsers() {
  var users = [];
  var serUsers = db.getUsers();
  for (var su of serUsers) {
    var user = new User(
      su.username,
      su.perm,
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
    su.perm,
    su.password,
    su.name,
    su.email,
    su.phone,
    su.verified
  );
  return user;
}

export {
  LVL,
  permFromCode,
  authLevel,
  deserializeUsers,
  deserializeUser
}
