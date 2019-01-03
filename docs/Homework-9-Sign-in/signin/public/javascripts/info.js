// info.js, javascript file for info.html, created by Yongye Fan, 22/12/2018
$(function() {
  var $infoContent = $('.info-content');
  $infoContent.addClass('mCustomScrollbar').attr('data-mcs-theme', 'minimal-dark');

  $infoContent.mCustomScrollbar({
    axis: 'x'
  });

  var $infoBar = $('.info-bar');
  if ($infoBar.hasClass('access-error')) {
    setTimeout(function() {
      $infoBar.css('opacity', 0);
    }, 2000);
    setTimeout(function() {
      $infoBar.html('用户信息').css('opacity', 1);
    }, 3000);
  }
});
