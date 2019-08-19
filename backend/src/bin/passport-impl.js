import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { RET } from './db';
import { deserializeUser } from './utils';

// eslint-disable-next-line consistent-return
passport.use(new LocalStrategy((username, password, done) => {
  const user = deserializeUser(username);
  if (RET.USER_NOT_FOUND === user) return done(null, false, { message: username });
  user.validPassword(password, (err, res) => {
    if (err) return done(err);
    if (res) return done(null, user);
    return done(null, false, { message: 'incorrect password' });
  });
}));

passport.serializeUser((user, done) => done(null, user.username));

passport.deserializeUser((username, done) => {
  let user = deserializeUser(username);
  if (RET.USER_NOT_FOUND === user) user = false;
  return done(null, user);
});

export default passport;
