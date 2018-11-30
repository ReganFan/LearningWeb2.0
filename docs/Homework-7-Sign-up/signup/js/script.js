// script.js, the javascript for index.html, created by Yongye Fan, 27/11/2018
$(function() {
  // hide error message first
  $('.error').slideUp();

  var $infoContent = $('input').not('.reset').not('.submit');
  var defaultValue = ['用户名', '学号', '手机', '邮箱'];

  // when url has the query of username
  var nameTag = $infoContent.eq(0);
  var hasQueryUsername = false;
  if (nameTag.val() != defaultValue[0]) {
    hasQueryUsername = true;
    nameTag.addClass('input-finish');
  }

  $infoContent.focus(function() {
    var $info = $(this);
    if ($info.val() == defaultValue[$infoContent.index($info)]) $info.val('');
  });

  function checkInputValid(info) {
    // check if the input is valid
    if (!validityCheck.ifInputValid(info.attr('name'), info.val())) info.next().addClass('error-show').slideDown();
    else {
      if (info.next().hasClass('error-show')) info.next().removeClass('error-show').slideUp();
    }
  }

  $infoContent.blur(function() {
    var $info = $(this);
    if (!$info.val()) $info.val(defaultValue[$infoContent.index($info)]);
    else {
      if ($info.val() != defaultValue[$infoContent.index($info)]) $info.addClass('input-finish');
    }

    checkInputValid($info);

    $info.on('input propertychange', function() { checkInputValid($(this)); });
  });

  $('.reset').click(function() {
    for (var i = 0; i < $infoContent.length; i++) {
      if ($infoContent.eq(i).hasClass('input-finish')) $infoContent.eq(i).removeClass('input-finish');

      // clear all error messages
      if ($infoContent.eq(i).next().hasClass('error-show')) $infoContent.eq(i).next().removeClass('error-show').slideUp();
    }

    $infoContent.off('input propertychange');

    // when url has the query of username
    if (hasQueryUsername) nameTag.addClass('input-finish');
  });
});
