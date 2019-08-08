import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { db } from '../app';
import { RET } from '../bin/db';
import { deserializeUser } from './utils';

passport.use(new LocalStrategy( (username, password, done ) => {
  var user = deserializeUser(username);
  if (RET.USER_NOT_FOUND === user) return done(null, false, { message: username });
  user.validPassword(password, (err, res) => {
    if (err) return done(err);
    if (res) return done(null, user);
    else return done(null, false, { message: 'incorrect password' });
  });
}));

passport.serializeUser((user, done) => {
  return done(null, user.username);
});

passport.deserializeUser((username, done) => {
  var user = deserializeUser(username);
  if (RET.USER_NOT_FOUND === user) user = false;
  else return done(null, user);
});

export default passport;
