import express from 'express';
var router = express.Router();

import { db } from '../app';
import { RET } from '../bin/db';

router.get('/', (req, res) => {
  res.send(db.getGameData());
});

export default router;
