import express from 'express';
var router = express.Router();

import { db } from '../app';
import { RET } from '../bin/db';
import { authLevel, permFromCode, LVL } from '../bin/utils';

router.get('/', (req, res) => {
  return res.send('test');
});

router.get('/users', (req, res) => {
  if (LVL.ADMIN !== permFromCode(authLevel(req))) return res.status(401).send();
  return res.send(db.getUsers());
});

router.get('/teams', (req, res) => {
  if (LVL.ADMIN !== permFromCode(authLevel(req))) return res.status(401).send();
  return res.send(db.getGameData().teams);
});

router.get('/:command/:username', (req, res) => {
  var { command, username } = req.params;
  var al = permFromCode(authLevel(req));
  var dbres = RET.UNKNOWN;
  switch(command) {
    case 'verify':
      if (LVL.ADMIN !== al) return res.status(401).send();
      dbres = db.verifyUser(username);
      break;
    case 'deverify':
      if (LVL.ADMIN !== al) return res.status(401).send();
      dbres = db.deverifyUser(username);
      break;
    case 'promote':
      if (LVL.ADMIN !== al) return res.status(401).send();
      dbres = db.promoteUser(username);
      break;
    case 'demote':
      if (LVL.ADMIN !== al) return res.status(401).send();
      dbres = db.demoteUser(username);
      break;
    case 'user':
      if (LVL.USER === al) {
        if (username !== req.user.username) return res.status(401).send();
      }
      if (LVL.NONE === al) return res.status(401).send();
      dbres = db.getUser(username);
      if (RET.USER_NOT_FOUND === dbres) return res.status(406).json({ errors: dbres });
      return res.send(dbres);
    default:
      break;
  }
  if (RET.UNKNOWN === dbres) return res.status(406).json({ errors: 'unknown command' });
  else return res.status(200).end();
});
/*
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

router.get('/promote/:username', (req, res) => {
  if (LVL.ADMIN !== authLevel(req)) return res.status(401).send)();
  var { username } = req.params;
  var dbres = db.promoteUser(username);
  if (RET.OK != dbres) return res.status(406).json({ errors: dbres });
  else return res.status(200).end();
});

router.get('/demote/:username', (req, res) => {
  if (LVL.ADMIN !== authLevel(req)) return res.status(401).send();
  var { username } =
})

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
*/
export default router;
