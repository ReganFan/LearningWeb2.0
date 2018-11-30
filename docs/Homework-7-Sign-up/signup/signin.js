// signin.js, a simple sign in server, created by Yongye Fan, 29/11/2018
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var pug = require('pug');
var colors = require('colors');

var userlist = {
  // 'ReganFan': {
  //   username: 'ReganFan',
  //   id: '15331072',
  //   mobile: '13719324545',
  //   email: 'fanyy9@mail2.sysu.edu.cn'
  // }
};

var server = http.createServer(function(req, res) {
  console.log('请求'.yellow, req.method, req.url);
  console.log('响应'.green, res.statusCode);

  var username = parseUsername(req);

  var filepath = '.' + req.url;
  var fileMine = /\.[a-z]+$/.test(req.url) ? req.url.match(/\.([a-z]+)/)[1] : 'html';

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
        if (!username || !hasRegister(username)) sendHtml(res, username, 'index');
        else sendHtml(res, username, 'info');
      }
      break;
  }
});

server.listen(8000);
console.log('Sign in Server is running at http://localhost:8000.'.bgWhite.black);

function parseUsername(req) {
  return querystring.parse(url.parse(req.url).query).username;
}

function sendFile(res, filepath, mine) {
  res.writeHead(200, {'Content-Type': mine});
  res.end(fs.readFileSync(filepath));
}

function sendHtml(res, username, page) {
  var data;
  if (page == 'index') data = { username: username };
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

    console.log('用户注册'.magenta);
    console.log(colors.gray('用户名', user.username));
    console.log(colors.gray('  学号', user.id));
    console.log(colors.gray('  手机', user.mobile));
    console.log(colors.gray('  邮箱', user.email));

    // checkUser(user);
    userlist[user.username] = user;

    console.log('注册成功！'.cyan);

    var urlObject = url.parse(req.url);
    urlObject.search = '?username=' + user.username;

    var newLocation = url.format(urlObject);

    res.writeHead(301, {'Location': newLocation});
    res.end(pug.renderFile('./html/info.pug', user));
  });
}
