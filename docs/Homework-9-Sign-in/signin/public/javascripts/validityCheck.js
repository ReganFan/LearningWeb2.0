// validityCheck.js, a module for validity check, created by Yongye Fan, 22/12/2018
var validityCheck = {
  password: '',

  ifUsernameValid: function(username) {
    return /^[A-Za-z][0-9A-Za-z_]{5,17}$/.test(username);
  },

  ifPasswordValid: function(password) {
    this.password = password;
    return /^[0-9A-Za-z_\-]{6,12}$/.test(password);
  },

  ifRePasswordValid: function(rePassword) {
    return rePassword == this.password;
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
      case 'password':
        validity = this.ifPasswordValid(value);
        break;
      case 're-password':
        validity = this.ifRePasswordValid(value);
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
           this.ifPasswordValid(user.password) && this.ifRePasswordValid(user.rePassword) &&
           this.ifMobileValid(user.mobile) && this.ifEmailValid(user.email);
  },

  ifUserInfoUnique: function(userlist, user, info) {
    for (var aUser in userlist) {
      if (userlist[aUser][info] == user[info]) return false;
    }

    return true;
  }
};

// export as a module
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = validityCheck;
