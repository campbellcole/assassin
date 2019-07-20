import express from 'express';
var router = express.Router();

import { db } from '../app';

router.post('/register', (req, res) => {
  const { username, pass, name, email, phone, registered } = req.body;

});

export default router;
