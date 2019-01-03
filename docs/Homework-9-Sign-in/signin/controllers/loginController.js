// login controller, for route post '/login'
var loginCheckUser = require('../models/usersManager').loginCheckUser;
var debug = require('debug')('signin:server');

function loginControl(req, res, next) {
  loginCheckUser(req.body.username, req.body.password).then(function(user) {
    var userCookie = {
      username: user.username,
      id: user.id,
      mobile: user.mobile,
      email: user.email
    };
    req.session.user = userCookie;
    debug('User', req.session.user.username, 'login');
    res.redirect('/?username=' + req.body.username);
  }).catch(function(err) {
    var loginError = {
      username: { content: '', message: '' },
      password: { message: '' }
    };

    switch (err.message) {
      case 'Password is wrong!':
        debug('login error - password is wrong');
        loginError.username.content = req.body.username;
        loginError.password.message = '密码错误';
        break;
      case 'Username does not exist!':
        debug('login error - username dose not exist');
        loginError.username.content = req.body.username;
        loginError.username.message = '用户名不存在';
        break;
      default:
        debug('Database retrieve user', req.body.username, 'error');
        break;
    }

    res.render('login', { ifAllow: true, error: loginError });
  });
}

module.exports = loginControl;
