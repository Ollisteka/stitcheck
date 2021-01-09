import createError from 'http-errors';

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
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', indexRouter);
app.use('/pattern', patternRouter);

app.use((req, res, next) => {
    res.locals.isDevelopment = req.app.get('env') === 'development';
    next();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

const errorHandler = function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = res.locals.isDevelopment ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
};
app.use(errorHandler);
