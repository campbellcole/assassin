import express from 'express';
import session from 'express-session';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';

import Database from './bin/db';

import indexRouter from './routes/index';
import passport from './bin/passport-impl';
import registerRouter from './routes/register';
import loginRouter from './routes/login';
import adminRouter from './routes/admin';
import gameRouter from './routes/game';

var db = new Database(path.join(__dirname, '../private/db.json'));

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
var sec = 'abcdef'; // change this later
app.use(cookieParser(sec));
app.use(session({ secret: sec, resave: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/game', gameRouter);

export default app;

export { db };
