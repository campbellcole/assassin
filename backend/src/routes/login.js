import express from 'express';
var router = express.Router();

import passport from '../bin/passport-impl';

import { authLevel } from '../bin/utils';

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.get('/lstat', (req, res) => {
  return res.send({
    username: undefined === req.user ? undefined : req.user.username,
    level: authLevel(req),
    loggedIn: req.isAuthenticated()
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  return res.send();
});

export default router;
