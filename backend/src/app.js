import express from 'express';
import session from 'express-session';
import sfs from 'session-file-store';
import path from 'path';
import uuid from 'uuid/v4';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';

import config from './config';

import Database from './bin/db';

import indexRouter from './routes/index';
import passport from './bin/passport-impl';
import registerRouter from './routes/register';
import loginRouter from './routes/login';
import adminRouter from './routes/admin';
import gameRouter from './routes/game';

var db = new Database(path.join(__dirname, '../private/db.json'));

const app = express();

const FileStore = sfs(session);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.secret));
app.use(session({
  genid: (req) => {
    return uuid();
  },
  store: new FileStore({ secret: config.secret }),
  secret: config.secret,
  resave: false,
  saveUninitialized: true
 }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/game', gameRouter);

export default app;

export { db };
