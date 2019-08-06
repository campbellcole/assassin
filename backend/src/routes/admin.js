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
  if (dbres != RET.OK) res.status(406).json({ errors: dbres });
  res.status(200).end();
});

export default router;
