import express from 'express';
var router = express.Router();

import { db } from '../app';
import { RET } from '../bin/db';
import { isLocal } from '../bin/utils';

router.use((req, res, next) => {
  if (!isLocal(req)) {
    return res.status(401).send();
  } else next();
});

router.get('/', (req, res) => {
  return res.send('test');
});

router.get('/users', (req, res) => {
  return res.send(db.getUsers());
});

router.get('/teams', (req, res) => {
  return res.send(db.getGameData().teams);
});

router.get('/verify/:username', (req, res) => {
  var { username } = req.params;
  var dbres = db.verifyUser(username);
  if (RET.OK !== dbres) return res.status(406).json({ errors: dbres });
  else return res.status(200).end();
});

router.get('/deverify/:username', (req, res) => {
  var { username } = req.params;
  var dbres = db.deverifyUser(username);
  if (RET.OK !== dbres) return res.status(406).json({ errors: dbres });
  else return res.status(200).end();
});

router.get('/user/:username', (req, res) => {
  var { username } = req.params;
  var dbres = db.getUser(username);
  if (RET.USER_NOT_FOUND === dbres) return res.status(406).json({ errors: dbres });
  else return res.send(dbres);
});

export default router;
