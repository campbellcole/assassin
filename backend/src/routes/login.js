import express from 'express';
var router = express.Router();

import passport from '../bin/passport-impl';

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  fauilureRedirect: '/test'
}));

router.get('/lstat', (req, res) => {
  return res.send({ loggedIn: req.isAuthenticated() });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send();
});

export default router;
