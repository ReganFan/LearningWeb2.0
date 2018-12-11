// index.js, the javascript for index.html, created by Yongye Fan, 8/12/2018
// Compared to index.js in S2, xhr objects array is used so that the program can abort all requests if the
// calculator resets before finishing getting responses, off course, function robotClick and autoCalculateSum
// are changed to ensure that five requests will be sent at the same time.
$(function () {
  // Initialize
  var server = 'http://localhost:3000';
  var $buttons = $('.button');
  var $answerBar = $('#info-bar');
  var $apb = $('.apb');
  var reset;
  var arrXHR = []; // XMLHttpRequest objects array
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
      arrXHR = []; // initialize xhr objects array
    }

    $buttons.not($button).each(function() {
      if ($(this).attr('enable') != 'no') {
        $(this).removeClass('button-enable').addClass('button-disable');
        $(this).off('click');
      }
    });

    var xhr = $.ajax({
      url: server,
      cache: false,   // ensure that the client gets response parallel
      error: function() { console.log('Calculator resets! Stop request!'); },
      success: function(data) {
        console.log('Get random number for', $button.attr('title'), ':', data);
        $value.html(data);
        enableButtons($button);
      }
    });

    arrXHR.push(xhr);
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

      if (disabledButtons == 0) {
        $answerBar.attr('class', 'button-enable');
        if (ifAutoPress) autoCalculateSum(null);
      }
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

    var autoPressPromise = new Promise(function(resolve, reject) {
      resolve('Successful auto press!');
    });

    autoPressPromise.then(function() { getNum.call($buttons.eq(0)); console.log('Press (Button A)'); })
                    .then(function() { getNum.call($buttons.eq(1)); console.log('Press (Button B)'); })
                    .then(function() { getNum.call($buttons.eq(2)); console.log('Press (Button C)'); })
                    .then(function() { getNum.call($buttons.eq(3)); console.log('Press (Button D)'); })
                    .then(function() { getNum.call($buttons.eq(4)); console.log('Press (Button E)'); });
  }

  function autoCalculateSum(err) {
    if (!err) {
      // prevent repeated event listeners binding of buttons and apb
      $buttons.off('click');
      $apb.off('click');

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
    // stop request
    arrXHR.forEach(function(xhr) {
      xhr.abort();
    });
    arrXHR = [];

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
