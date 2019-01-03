// regist controller, for route post '/regist'
var createUser = require('../models/usersManager').createUser;
var registCheckUser = require('../models/usersManager').registCheckUser;
var debug = require('debug')('signin:server');

function registControl(req, res, next) {
  var userInfo = {
    username: req.body.username,
    password: req.body.password,
    id: req.body['student-id'],
    mobile: req.body.mobile,
    email: req.body.email
  };

  debug('New user regists:');
  console.log(userInfo);

  registCheckUser(userInfo).then(function() {
    createUser(userInfo);
    debug('Regist success!');
    req.session.user = userInfo;
    res.redirect('../?username=' + userInfo.username);
  }).catch(function(err) {
    var registErr = { errorInfo: null, userInfo: userInfo};
    debug('Regist fails!');

    switch (err.message) {
      case 'username is repeat!':
        registErr.errorInfo = '用户名内容重复！';
        break;
      case 'id is repeat!':
        registErr.errorInfo = '学号内容重复！';
        break;
      case 'mobile is repeat!':
        registErr.errorInfo = '手机内容重复！';
        break;
      case 'email is repeat!':
        registErr.errorInfo = '邮箱内容重复！';
        break;
      default:
        registErr.errorInfo = '数据库故障，请稍后再试！';
        break;
    }

    res.render('regist', { username: null, error: registErr });
  });
}

module.exports = registControl;
