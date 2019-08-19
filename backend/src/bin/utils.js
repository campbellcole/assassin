import User from './struct/user';
import { db } from '../app';
import { RET } from './db';

const LVL = {
  NONE: { code: -1 },
  USER: { code: 0 },
  ADMIN: { code: 1 },
};

function permFromCode(code) {
  const t = Object.keys(LVL).find((elem) => code === LVL[elem].code);
  return LVL[t];
}

function authLevel(req) {
  if (undefined === req.user) return LVL.NONE.code;
  return req.user.perm;
}

function deserializeUsers() {
  const users = [];
  const serUsers = db.getUsers();
  serUsers.forEach((su) => {
    const user = new User(
      su.username,
      su.perm,
      su.password,
      su.name,
      su.email,
      su.phone,
      su.verified,
    );
    users.push(user);
  });
  return users;
}

function deserializeUser(username) {
  const su = db.getUser(username);
  if (RET.USER_NOT_FOUND === su) return su;
  const user = new User(
    su.username,
    su.perm,
    su.password,
    su.name,
    su.email,
    su.phone,
    su.verified,
  );
  return user;
}

export {
  LVL,
  permFromCode,
  authLevel,
  deserializeUsers,
  deserializeUser,
};
