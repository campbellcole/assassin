import express from 'express';

import { db } from '../app';

const router = express.Router();

router.get('/', (req, res) => res.send(db.getGameData()));

export default router;
