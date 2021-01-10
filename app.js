import express from 'express';

import { router as patternRouter } from './routes/pattern.js';
import { router as indexRouter } from './routes/index.js';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

export const app = express();

// view engine setup
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'client/build')));

app.use((req, res, next) => {
    res.locals.isDevelopment = req.app.get('env') === 'development';
    next();
});

app.use('/pattern', patternRouter);
app.use('/', indexRouter);

app.use('*', (req, res) => {
    res.redirect('/');
});
