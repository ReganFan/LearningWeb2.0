// validityCheck.js, a module for validity check, created by Yongye Fan, 30/11/2018
var validityCheck = {
  ifUsernameValid: function(username) {
    return /^[A-Za-z][0-9A-Za-z_]{5,17}$/.test(username);
  },

  ifIDValid: function(id) {
    return /^[1-9][0-9]{7}$/.test(id);
  },

  ifMobileValid: function(mobile) {
    return /^[1-9][0-9]{10}$/.test(mobile);
  },

  ifEmailValid: function(email) {
    return /^[0-9A-Za-z_\-]+@(([0-9A-Za-z_\-])+\.)+[A-Za-z]{2,4}$/.test(email);
  },

  ifInputValid: function(fieldname, value) {
    var validity;
    switch (fieldname) {
      case 'username':
        validity = this.ifUsernameValid(value);
        break;
      case 'student-id':
        validity = this.ifIDValid(value);
        break;
      case 'mobile':
        validity = this.ifMobileValid(value);
        break;
      default:
        validity = this.ifEmailValid(value);
        break;
    }

    return validity;
  },

  ifUserValid: function(user) {
    return this.ifUsernameValid(user.username) && this.ifIDValid(user.id) &&
           this.ifMobileValid(user.mobile) && this.ifEmailValid(user.email);
  },

  ifUserInfoUnique: function(userlist, user, info) {
    for (var aUser in userlist) {
      for (var infoContent in aUser) {
        if (infoContent == user[info]) return false;
      }
    }

    return true;
  }
};

if (typeof validityCheck == 'undefined') module.exports = validityCheck;
