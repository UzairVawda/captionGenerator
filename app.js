var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require("firebase/app");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var signinRouter = require('./routes/signin');
var logoutRouter = require('./routes/logout');
var imageRouter = require('./routes/image');
var captionRouter = require('./routes/caption');

var app = express();

var firebaseConfig = {
    apiKey: "AIzaSyBATCUhsyH5fh6ZyO40o5uMSQ1C4pnQ3JI",
    authDomain: "captiongenerator-268515.firebaseapp.com",
    databaseURL: "https://captiongenerator-268515.firebaseio.com",
    projectId: "captiongenerator-268515",
    storageBucket: "captiongenerator-268515.appspot.com",
    messagingSenderId: "1044671701815",
    appId: "1:1044671701815:web:bf20df43e586e59016f0b2",
    measurementId: "G-VTC2SDSRB5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Add the Firebase products that you want to use
var auth = require("firebase/auth");
var firestore = require("firebase/firestore");

// view engine setup
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/signin', signinRouter);
app.use('/logout', logoutRouter);
app.use('/image', imageRouter);
app.use('/caption', captionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;