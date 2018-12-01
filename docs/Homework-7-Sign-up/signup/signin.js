// signin.js, a simple sign in server, created by Yongye Fan, 29/11/2018
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var pug = require('pug');
var colors = require('colors');
var validityCheck = require('./js/validityCheck');

var userlist = {};
var hostname = '127.0.0.1';
var port = 8000;

var server = http.createServer(function(req, res) {
  // check requests and responses at the console
  // console.log('请求'.yellow, req.method, req.url);
  // console.log('响应'.green, res.statusCode);

  var username = parseUsername(req);

  var filepath = '.' + req.url;
  var fileMine = /(\.[a-z]+)$/.test(req.url) ? req.url.match(/(\.([a-z]+))$/)[2] : 'html';

  // send files
  switch (fileMine) {
    // image
    case 'jpg':
      sendFile(res, filepath, 'image/jpg');
      break;
    case 'png':
      sendFile(res, filepath, 'image/png');
      break;
    // stylesheet
    case 'css':
      sendFile(res, filepath, 'text/css');
      break;
    // javascript file
    case 'js':
      sendFile(res, filepath, 'text/javascript');
      break;
    // html
    default:
      if (req.method === 'POST') register(req, res);
      else {
        if (!username || !hasRegister(username)) sendHtml(res, username, 'index', null);
        else sendHtml(res, username, 'info', null);
      }
      break;
  }
});

server.listen(port, hostname);
console.log(('Sign in Server is running at http://' + hostname + ':' + port + '.').bgWhite.black);

function parseUsername(req) {
  return querystring.parse(url.parse(req.url).query).username;
}

function sendFile(res, filepath, mine) {
  res.writeHead(200, {'Content-Type': mine});
  res.end(fs.readFileSync(filepath));
}

function sendHtml(res, username, page, error) {
  var data;
  if (page == 'index') data = { username: username, error: error };
  else data = userlist[username];

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(pug.renderFile('./html/' + page + '.pug', data));
}

function hasRegister(username) {
  return !!userlist[username];
}

function register(req, res) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });

  req.on('end', function() {
    data = querystring.parse(data);

    var user = {
      username: data.username,
      id: data['student-id'],
      mobile: data.mobile,
      email: data.email
    };

    try {
      console.log('用户注册'.magenta);
      console.log(colors.gray('用户名', user.username));
      console.log(colors.gray('  学号', user.id));
      console.log(colors.gray('  手机', user.mobile));
      console.log(colors.gray('  邮箱', user.email));

      // check if user info is correct, if not, throw error
      checkUser(user);
      userlist[user.username] = user;

      console.log('注册成功！'.cyan);

      var urlObject = url.parse(req.url);
      urlObject.search = '?username=' + user.username;

      var newLocation = url.format(urlObject);

      res.writeHead(301, {'Location': newLocation});
      res.end(pug.renderFile('./html/info.pug', user));
    } catch (err) {
      // console.log(err);
      console.log('注册失败！'.red);
      var message = err.message.match(/[\u4e00-\u9fa5\s]+\./g);

      if (message) {
        for (var i = 0; i < message.length; i++) {
          console.log('出错'.red, message[i]);
        }
      }

      var newError = {
        errorInfo: {
          firstError: null,
          secondError: null,
          length: 0
        },

        userInfo: user
      };

      if (message.length == 2) {
        newError.errorInfo.firstError = message[0];
        newError.errorInfo.secondError = message[1];
        newError.errorInfo.length = 2;
      }
      else {
        newError.errorInfo.firstError = message[0];
        newError.errorInfo.length = 1;
      }

      sendHtml(res, null, 'index', newError);
    }
  });
}

function checkUser(user) {
  var info = {
    username: '用户名 ',
    id: '学号 ',
    mobile: '手机 ',
    email: '邮箱 '
  };

  var errorMessage = '';

  // check if user info is correct
  if (!validityCheck.ifUserValid(user)) {
    if (!validityCheck.ifUsernameValid(user.username)) errorMessage += info.username;
    if (!validityCheck.ifIDValid(user.id)) errorMessage += info.id;
    if (!validityCheck.ifMobileValid(user.mobile)) errorMessage += info.mobile;
    if (!validityCheck.ifEmailValid(user.email)) errorMessage += info.email;
    errorMessage += '格式出错.';
  }

  // check if user info is unique
  var unique = true;
  for (var infoContent in user) {
    if (!validityCheck.ifUserInfoUnique(userlist, user, infoContent)) {
      switch (infoContent) {
        case 'username':
          errorMessage += info.username;
          break;
        case 'id':
          errorMessage += info.id;
          break;
        case 'mobile':
          errorMessage += info.mobile;
          break;
        default:
          errorMessage += info.email;
          break;
      }
      unique = false;
    }
  }

  if (!unique) errorMessage += '内容重复.';

  if (errorMessage.length > 0) throw new Error(errorMessage);
}
