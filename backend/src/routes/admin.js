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

export default router;
