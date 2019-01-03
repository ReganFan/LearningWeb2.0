// userSchema for user info, using mongoose
var mongoose = require('mongoose');
var debug = require('debug')('signin:database');
var dbUrl = 'mongodb://localhost:27017/db';

mongoose.connect(dbUrl, { useNewUrlParser: true });

mongoose.connection.on('connected', function() {
  debug('Connect successfully:', dbUrl);
});

mongoose.connection.on('error', function(err) {
  debug('Connect error:', err);
});

mongoose.connection.on('disconnected', function() {
  debug('Disconnect:', dbUrl);
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  id: String,
  mobile: String,
  email: String
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;
