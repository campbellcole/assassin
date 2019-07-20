import express from 'express';
var router = express.Router();
import { check, validationResult } from 'express-validator';

import { db } from '../app';
import { RET } from '../bin/db';

router.post('/', [
  check('username').isLength({ min: 3 }),
  check('password').isLength({ min: 8 }),
  check('email').isEmail(),
  check('phone').isMobilePhone()
], (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(422).json({ errors: err.array() });
  const { username, password, name, email, phone, registered } = req.body;
  var dbres = db.addUser(username, password, name, email, phone, false);
  if (RET.OK != dbres) return res.status(422).json({ errors: [ dbres ]});
  res.send('registration submitted successfully. once confirmed, you will receive an email.');
});

export default router;
