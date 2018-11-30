// info_script.js, javascript file for info.html, created by Yongye Fan, 29/11/2018
$(function() {
  var $infoContent = $('.info-content');
  $infoContent.addClass('mCustomScrollbar').attr('data-mcs-theme', 'minimal-dark');

  $infoContent.mCustomScrollbar({
    axis: 'x'
  });
});
