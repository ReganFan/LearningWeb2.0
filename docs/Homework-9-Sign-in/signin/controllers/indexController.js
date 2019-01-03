// index controller, for route get '/'
var retrieveUser = require('../models/usersManager').retrieveUser;
var debug = require('debug')('signin:server');

function indexControl(req, res, next) {
  if (req.session.user) next();
  else if (!!req.query.username) {
    retrieveUser(req.query.username)
      .catch(function(err) { debug('Database retrieve user', req.query.username, 'error'); })
      .then(function(user) {
        // if user wants to access, he should sign in first, otherwise,
        // ifAllow equals false and warning "Please sign in first" will be shown
        if (user) res.render('login', { ifAllow: false, error: null });
        else res.redirect('/regist?username=' + req.query.username); // /?username=NewAccount, jump to sign up page automatically
      });
  } else res.redirect('/login');
}

module.exports = indexControl;
