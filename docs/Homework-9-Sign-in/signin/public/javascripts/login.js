// script.js, the javascript for index.html, a simple sign in web page, created by Yongye Fan, 22/12/2018
$(function() {
  // hide error message first
  $('.error').each(function() {
    if (!$(this).hasClass('error-show')) $(this).slideUp();
  });

  var loginErrMessage = {
    username: '请输入6~18位英文字母、数字或下划线，且以英文字母开头',
    password: '密码为6~12位数字、大小写字母、中划线、下划线'
  };

  var $infoContent = $('form').find('input').not('.submit');
  var defaultValue = ['用户名', '密码'];

  // first input, clear default value
  $infoContent.focus(function() {
    var $info = $(this);
    if ($info.val() == defaultValue[$infoContent.index($info)]) $info.val('');

    // change into the password format
    if ($info.attr('name') == 'password') $info.attr('type', 'password');
  });

  function checkInputValid(info) {
    // check if the input is valid
    if (!validityCheck.ifInputValid(info.attr('name'), info.val())) {
      info.addClass('input-error');
      info.next().html(loginErrMessage[info.attr('name')]).addClass('error-show').slideDown();
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

      if ($info.attr('name') == 'password') $info.attr('type', 'text');
    } else {
      if ($info.val() != defaultValue[$infoContent.index($info)]) {
        $info.addClass('input-finish');
        if ($info.next().hasClass('error-show')) $info.next().html('').removeClass('error-show');
      } else {
        if ($info.hasClass('input-finish')) $info.removeClass('input-finish');
      }
    }

    checkInputValid($info);

    // check input value at real time
    $info.on('input propertychange', function() { checkInputValid($(this)); });
  });

  // when submit page with errors, keep error messages
  function keepErrorAfterSubmit() {
    for (var i = 0; i < $infoContent.length; i++) {
      if ($infoContent.eq(i).val() != defaultValue[i]) {
        $infoContent.eq(i).addClass('input-finish');
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

  var $infoBar = $('.info-bar');
  if ($infoBar.hasClass('access-error')) {
    setTimeout(function() {
      $infoBar.css('opacity', 0);
    }, 2000);
    setTimeout(function() {
      $infoBar.html('Sakura 桜').css('opacity', 1);
    }, 3000);
  }
});
