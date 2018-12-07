var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const GitLabStrategy = require('passport-gitlab2');
const gitlabOAuthConfig = require('./config');

var router = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

/** 
 * Passport configuration for OpenID Connect support 
 */
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GitLabStrategy(gitlabOAuthConfig, (accessToken, refreshToken, profile, cb) => {
  cb(null, profile)
}))

app.get('/login', passport.authenticate('gitlab'));
app.get('/auth/gitlab/callback',
  passport.authenticate('gitlab', {
    failureRedirect: '/'
  }), (req, res) => {
    res.redirect(`/users/${req.user.username}`)
  });

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
