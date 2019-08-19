import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import { db } from '../app';
import { RET } from '../bin/db';

const router = express.Router();

router.post('/', [
  check('username').isLength({ min: 3, max: 32 }),
  check('password').isLength({ min: 8, max: 64 }),
  check('email').isEmail(),
  check('phone').isMobilePhone(),
], (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(422).json({ errors: err.array() });
  const {
    username, password, name, email, phone,
  } = req.body;
  const bpassword = bcrypt.hashSync(password, 10);
  const dbres = db.addUser(
    username,
    bpassword,
    name,
    email,
    phone,
    false,
  ); // TODO: admin creation of preverified users
  if (RET.OK !== dbres) return res.status(422).json({ errors: [dbres] });
  return res.send('registration submitted successfully. once confirmed, you will receive an email.');
});

export default router;
