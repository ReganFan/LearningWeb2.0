// index.js, the javascript for index.html, created by Yongye Fan, 6/12/2018
$(function () {
  // Initialize
  var server = 'http://localhost:3000';
  var $buttons = $('.button');
  var $answerBar = $('#info-bar');
  var reset;
  var xhr; // XMLHttpRequest object

  $answerBar.addClass('button-disable');
  $buttons.attr('enable', 'yes').addClass('button-enable');
  $('.num').hide();

  function getNum() {
    var $button = $(this);
    var $value = $button.find('.num');
    $value.html('...').show();
    $button.off('click');  // only one click event happens when getting number

    reset = false;

    $buttons.not($button).each(function() {
      if ($(this).attr('enable') != 'no') {
        $(this).removeClass('button-enable').addClass('button-disable');
        $(this).off('click');
      }
    });

    xhr = $.ajax({
      url: server,
      cache: false,
      error: function() { console.log('Calculator resets! Stop request!'); },
      success: function(data) {
        console.log('Get random number for', $button.attr('title'), ':', data);
        $value.html(data);
        enableButtons($button);
      }
    });
  }

  // buttons states can't change if reset before GET request finishes
  function enableButtons($button) {
    if (!reset) {
      $button.attr({
        'enable': 'no',
        class: 'button button-disable'
      });

      var disabledButtons = 0;

      $buttons.each(function() {
        if ($(this).attr('enable') != 'no') {
          $(this).removeClass('button-disable').addClass('button-enable');
          $(this).click(getNum);
          disabledButtons++;
        }
      });

      if (disabledButtons == 0) $answerBar.attr('class', 'button-enable');
    }
  }

  function getSum(callback) {
    var sum = 0;
    $buttons.each(function() {
      sum = sum + parseInt($(this).find('.num').html());
    });

    callback(null, sum);
  }

  // Start, set event listeners
  $('#button').mouseenter(function() {
    $buttons.click(getNum);
    $answerBar.click(function() {
      var $this = $(this);
      if ($this.hasClass('button-enable')) {
        getSum(function(err, sum) {
          if (!err) {
            $('.sum').html(sum);
            $this.attr('class', 'button-disable');
            console.log('Sum :', sum);
          } else {
            console.log('Error sum!');
          }

          $buttons.each(function() {
            $(this).attr({
              'enable': 'yes',
              class: 'button button-enable'
            });
          }).click(getNum);
        });
      }
    });
  });

  // Reset
  $('#button').mouseleave(function() {
    reset = true; // reset calculator
    if (xhr) xhr.abort(); // stop request
    $answerBar.attr('class', 'button-disable').off('click');
    $buttons.attr({
      'enable': 'yes',
      class: 'button button-enable'
    }).off('click');
    $('.num').empty().hide();
    $('.sum').empty();
  });
});
