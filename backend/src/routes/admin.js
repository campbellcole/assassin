import express from 'express';
var router = express.Router();

import { db } from '../app';
import { RET } from '../bin/db';
import { authLevel, LVL } from '../bin/utils';

router.get('/', (req, res) => {
  return res.send('test');
});

router.get('/users', (req, res) => {
  if (LVL.ADMIN !== authLevel(req)) return res.status(401).send();
  return res.send(db.getUsers());
});

router.get('/teams', (req, res) => {
  if (LVL.ADMIN !== authLevel(req)) return res.status(401).send();
  return res.send(db.getGameData().teams);
});

router.get('/verify/:username', (req, res) => {
  if (LVL.ADMIN !== authLevel(req)) return res.status(401).send();
  var { username } = req.params;
  var dbres = db.verifyUser(username);
  if (RET.OK !== dbres) return res.status(406).json({ errors: dbres });
  else return res.status(200).end();
});

router.get('/deverify/:username', (req, res) => {
  if (LVL.ADMIN !== authLevel(req)) return res.status(401).send();
  var { username } = req.params;
  var dbres = db.deverifyUser(username);
  if (RET.OK !== dbres) return res.status(406).json({ errors: dbres });
  else return res.status(200).end();
});

router.get('/user/:username', (req, res) => {
  var { username } = req.params;
  var al = authLevel(req);
  if (LVL.USER === al) {
    if (username !== req.user.username) return res.status(401).send();
  }
  if (LVL.NONE === al) return res.status(401).send();
  var dbres = db.getUser(username);
  if (RET.USER_NOT_FOUND === dbres) return res.status(406).json({ errors: dbres });
  else return res.send(dbres);
});

export default router;
