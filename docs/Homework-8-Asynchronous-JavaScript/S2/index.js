// index.js, the javascript for index.html, created by Yongye Fan, 7/12/2018
// Compared to index.js in S1, function enableButtons is modified, function robotClick, autoPressButton and
// autoCalculateSum are added, you can get random numbers and get sum by yourself or click @ button to let
// program get random numbers and calculate automatically in the order of A ~ E.
$(function () {
  // Initialize
  var server = 'http://localhost:3000';
  var $buttons = $('.button');
  var $answerBar = $('#info-bar');
  var $apb = $('.apb');
  var reset;
  var xhr; // XMLHttpRequest object
  var ifAutoPress = false; // check if robot press starts

  $answerBar.addClass('button-disable');
  $buttons.attr('enable', 'yes').addClass('button-enable');
  $('.num').hide();
  $('.icon').addClass('button-enable');

  function getNum() {
    var $button = $(this);
    var $value = $button.find('.num');
    $value.html('...').show();
    $button.off('click');  // only one click event happens when getting number

    reset = false;

    if (!ifAutoPress) {    // if user press by himself, disable @ button
      $('.icon').removeClass('button-enable').addClass('button-disable');
      $apb.off('click');
    }

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
        enableButtons($button, autoPressButton); // add autoPressButton as callback
      }
    });
  }

  // buttons states can't change if reset before GET request finishes
  function enableButtons($button, callback) {
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

      callback(null, ifAutoPress, $button, autoCalculateSum);
    }
  }

  function getSum(callback) {
    var sum = 0;
    $buttons.each(function() {
      sum = sum + parseInt($(this).find('.num').html());
    });

    callback(null, sum);
  }

  function robotClick() {
    $('.icon').removeClass('button-enable').addClass('button-disable');
    $apb.off('click');

    ifAutoPress = true;

    $buttons.eq(0).click();
  }

  function autoPressButton(err, ifAutoPress, $button, callback) {
    if (err) console.log('Auto press button error!');
    else if (ifAutoPress) {
      if ($button.next().hasClass('button')) $button.next().click();
      else callback(null);
    }
  }

  function autoCalculateSum(err) {
    if (!err) {
      $answerBar.click();
      ifAutoPress = false;
    } else console.log('Robot calculates error!');
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

          $('.icon').removeClass('button-disable').addClass('button-enable');
          $apb.click(robotClick);
        });
      }
    });

    $apb.click(robotClick);
  });

  // Reset
  $('#button').mouseleave(function() {
    reset = true; // reset calculator
    ifAutoPress = false;
    if (xhr) xhr.abort(); // stop request
    $answerBar.attr('class', 'button-disable').off('click');
    $buttons.attr({
      'enable': 'yes',
      class: 'button button-enable'
    }).off('click');
    $('.num').empty().hide();
    $('.sum').empty();
    $('.icon').removeClass('button-disable').addClass('button-enable');
    $apb.off('click');
  });
});
