// regist.js, the javascript for regist.html, created by Yongye Fan, 22/12/2018
$(function() {
  // hide error message first
  $('.error').slideUp();

  var registErrMessage = {
    username: '请输入6~18位英文字母、数字或下划线，且以英文字母开头',
    password: '密码为6~12位数字、大小写字母、中划线、下划线',
    're-password': '两次密码不一致',
    'student-id': '请输入8位数字学号，不能以0开头',
    mobile: '请输入11位数字电话号码，不能以0开头',
    email: "请输入正确格式的邮箱，如'**@**.com'，*为字母、数字、中划线或下划线的组合"
  };

  var $infoContent = $('input').not('.reset').not('.submit');
  var defaultValue = ['用户名', '密码', '重复密码', '学号', '手机', '邮箱'];

  // when url has the query of username, show bold
  var nameTag = $infoContent.eq(0);
  var hasQueryUsername = false;
  if (nameTag.val() != defaultValue[0]) {
    hasQueryUsername = true;
    nameTag.addClass('input-finish');
  }

  // password and re-password should check each other automatically
  function autoCheckPassword() {
    var password = $infoContent.eq(1);
    var rePassword = $infoContent.eq(2);

    password.on('input propertychange', function() {
      validityCheck.password = password.val();
      // when one inputs password in re-password area before the input in password area, should check
      // the input in re-password automatically
      if (rePassword.val() != defaultValue[2]) {
        checkInputValid(rePassword);
      }
    });

    rePassword.on('input propertychange', function() {
      checkInputValid(rePassword);
    });
  }

  autoCheckPassword();

  // first input, clear default value
  $infoContent.focus(function() {
    var $info = $(this);
    if ($info.val() == defaultValue[$infoContent.index($info)]) $info.val('');

    // change into the password format
    if ($info.attr('name') == 'password' || $info.attr('name') == 're-password') $info.attr('type', 'password');
  });

  function checkInputValid(info) {
    // check if the input is valid
    if (!validityCheck.ifInputValid(info.attr('name'), info.val())) {
      info.addClass('input-error');
      info.next().html(registErrMessage[info.attr('name')]).addClass('error-show').slideDown();
    } else {
      if (info.next().hasClass('error-show')) info.next().html('').slideUp().removeClass('error-show');
      if (info.hasClass('input-error')) info.removeClass('input-error');
    }
  }

  $infoContent.blur(function() {
    var $info = $(this);
    if (!$info.val()) {
      $info.val(defaultValue[$infoContent.index($info)]);
      if ($info.hasClass('input-finish')) $info.removeClass('input-finish');

      if ($info.attr('name') == 'password' || $info.attr('name') == 're-password') $info.attr('type', 'text');
    } else {
      if ($info.val() != defaultValue[$infoContent.index($info)]) $info.addClass('input-finish');
      else {
        if ($info.hasClass('input-finish')) $info.removeClass('input-finish');
      }
    }

    checkInputValid($info);

    // check input value at real time
    $info.on('input propertychange', function() { checkInputValid($(this)); });
  });

  $('.reset').click(function() {
    for (var i = 0; i < $infoContent.length; i++) {
      if ($infoContent.eq(i).hasClass('input-finish')) $infoContent.eq(i).removeClass('input-finish');

      // clear all error messages
      if ($infoContent.eq(i).next().hasClass('error-show')) $infoContent.eq(i).next().html('').slideUp().removeClass('error-show');
      if ($infoContent.eq(i).hasClass('input-error')) $infoContent.eq(i).removeClass('input-error');

      // recover password format
      if ($infoContent.eq(i).attr('name') == 'password' || $infoContent.eq(i).attr('name') == 're-password')
        $infoContent.eq(i).attr('type', 'text');
    }

    $infoContent.off('input propertychange');

    // when url has the query of username, make the input of username bold
    if (hasQueryUsername) nameTag.addClass('input-finish');

    validityCheck.password = '';
    autoCheckPassword();
  });

  // when submit page with errors, keep error messages
  function keepErrorAfterSubmit() {
    for (var i = 0; i < $infoContent.length; i++) {
      if ($infoContent.eq(i).val() != defaultValue[i]) {
        $infoContent.eq(i).addClass('input-finish');

        checkInputValid($infoContent.eq(i));
      }
    }
  }

  keepErrorAfterSubmit();

  // if error, submit fails
  $('form').submit(function() {
    var $inputItems = $('form > div').not('.buttons');

    for (var i = 0; i < $inputItems.length; i++) {
      var $info = $inputItems.eq(i).find('input');
      checkInputValid($info);
      if ($info.hasClass('input-error')) {
        $info.parent().fadeOut('fast').fadeIn('normal');
        return false;
      }
    }

    return true;
  });
});
