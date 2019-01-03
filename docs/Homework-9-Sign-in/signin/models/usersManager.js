// users manager model
var userModel = require('./userSchema');
var debug = require('debug')('signin:database');
var bcrypt = require('bcryptjs');

function createUser(userInfo) {
  var pwd = userInfo.password;
  bcrypt.genSalt(10).then(function(salt) {
    bcrypt.hash(pwd, salt).then(function(hash) {
      var user = userInfo;
      user.password = hash;
      userModel.create(user)
        .then(function(user) { debug('create user successfully:', user); })
        .catch(function(err) { debug('create user error:', err); });
    }).catch(function(err) { debug('bcrypt hash error:', err); });
  }).catch(function(err) { debug('bcrypt genSalt error:', err); });
}

function retrieveUser(username) {
  return userModel.findOne({ username: username }).exec();
}

function loginCheckUser(username, password) {
  return userModel.findOne({ username: username }).exec()
    .catch(function(err) { debug('retrieve user error:', err); })
    .then(function(user) {
      if (user) {
        return bcrypt.compare(password, user.password).then(function(res) {
          return res ? Promise.resolve(user) : Promise.reject(new Error('Password is wrong!'));
        }).catch(function(err) { debug('bcrypt compare error:', err); });
      } else return Promise.reject(new Error('Username does not exist!'));
    });
}

function registCheckUser(userInfo) {
  return infoRepeat({ username: userInfo.username })
    .then(function() { return infoRepeat({ id: userInfo.id }); })
    .then(function() { return infoRepeat({ mobile: userInfo.mobile }); })
    .then(function() { return infoRepeat({ email: userInfo.email }); })
    .then(function() { return Promise.resolve('PASS'); })
    .catch(function(err) { debug(err.message); return Promise.reject(err); });
}

function infoRepeat(options) {
  return userModel.find(options).exec()
    .catch(function(err) { debug('retrieve user info error:', err); })
    .then(function(userlist) {
      if (userlist.length != 0) {
        return Promise.reject(new Error(Object.keys(options)[0] + ' is repeat!'));
      } else return Promise.resolve();
    });
}

var usersManager = {
  createUser: createUser,
  retrieveUser: retrieveUser,
  loginCheckUser: loginCheckUser,
  registCheckUser: registCheckUser
};

module.exports = usersManager;
