import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import Database from './bin/db';

import indexRouter from './routes/index';
import registerRouter from './routes/register';

var db = new Database(path.join(__dirname, '../private/db.json'));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);

export default app;

export { db };
