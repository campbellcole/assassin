import express from 'express';
var router = express.Router();

import { db } from '../app';
import { RET } from '../bin/db';
import { isLocal } from '../bin/utils';

router.use((req, res, next) => {
  if (!isLocal(req)) {
    res.status(401).send();
  } else next();
});

router.get('/', (req, res) => {
  res.send('test');
});

router.get('/users', (req, res) => {
  res.send(db.getUsers());
});

router.get('/teams', (req, res) => {
  res.send(db.getGameData().teams);
});

router.get('/verify/:username', (req, res) => {
  var { username } = req.params;
  // doesn't really matter if they're already verified
  var dbres = db.verifyUser(username);
  if (RET.OK !== dbres) res.status(406).json({ errors: dbres });
  else res.status(200).end();
});

router.get('/user/:username', (req, res) => {
  var { username } = req.params;
  var dbres = db.getUser(username);
  if (RET.USER_NOT_FOUND === dbres) res.status(406).json({ errors: dbres });
  else res.send(dbres);
})

export default router;
