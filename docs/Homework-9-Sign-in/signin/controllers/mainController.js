// main controller
var indexControl = require('./indexController');
var loginControl = require('./loginController');
var registControl = require('./registController');
var accessControl = require('./accessController');
var debug = require('debug')('signin:server');

function loginPageControl(req, res, next) {
  res.render('login', { ifAllow: true, error: null });
}

function registPageControl(req, res, next) {
  if (!!req.query.username) res.render('regist', { username: req.query.username, error: null });
  else res.render('regist', { username: null, error: null });
}

function logoutControl(req, res, next) {
  debug('User', req.session.user.username, 'logout');
  delete req.session.user;  // XXX, maybe the whole session needs to be deleted instead of user data
  res.redirect('/login');
}

module.exports = {
  index: indexControl,
  loginPage: loginPageControl,
  login: loginControl,
  registPage: registPageControl,
  regist: registControl,
  logout: logoutControl,
  access: accessControl
};
