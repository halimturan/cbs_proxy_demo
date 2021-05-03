const createError = require('http-errors');
const express = require('express');
const cookieParser = require("cookie-parser");
const path = require('path');
const logger = require('morgan');

const csrf = require('csurf')
const bodyParser = require('body-parser')
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false })

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const mediaRouter = require('./routes/media');
const proxyRouter = require('./routes/proxy');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', csrfProtection, indexRouter);
app.use('/api', parseForm, csrfProtection, apiRouter);
app.use('/media', mediaRouter);
app.use('/proxy', parseForm, csrfProtection, proxyRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
