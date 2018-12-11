// index.js, the javascript for index.html, created by Yongye Fan, 9/12/2018
// Compared to S2, function getRandomArr and getSequence are added to get a random click sequence
// for robot. What's more, global variables sequence and index are used to record that sequence, and
// function robotClick and autoPressButton are both modified so that robot can click buttons in the
// order of that random sequence.
$(function () {
  // Initialize
  var server = 'http://localhost:3000';
  var $buttons = $('.button');
  var $answerBar = $('#info-bar');
  var $apb = $('.apb');
  var reset;
  var xhr; // XMLHttpRequest object
  var ifAutoPress = false; // check if robot press starts
  var sequence, index; // record the random sequence and index

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

      callback(null, ifAutoPress, autoCalculateSum);
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

    getSequence(function(err, seq) {
      if (err) console.log('Get sequence error!');
      else {
        console.log('Get sequence:', seq.letter);
        var seqStr = '';
        seq.letter.forEach(function(l) {
          seqStr = seqStr + l + ' ';
        });
        seqStr = seqStr.slice(0, seqStr.length - 1);

        $('.sequence').html(seqStr).show();

        sequence = seq.number;
        index = 0;
        $buttons.eq(sequence[index]).click();
      }
    });
  }

  function autoPressButton(err, ifAutoPress, callback) {
    if (err) console.log('Auto press button error!');
    else if (ifAutoPress) {
      if (index < sequence.length - 1) {
        $buttons.eq(sequence[++index]).click();
      } else callback(null);
    }
  }

  function autoCalculateSum(err) {
    if (!err) {
      $answerBar.click();
      ifAutoPress = false;
      $('.sequence').html('').hide();
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
    $('.sequence').html('').hide();
    $('.icon').removeClass('button-disable').addClass('button-enable');
    $apb.off('click');
  });
});

function getRandomArr(len, callback) {
  var tempArr = Array(len).join(',').split(',').map(function(key, index) {
    return index;
  });
  var array = [];
  var i = 0, tempIndex;

  while (i < len) {
    tempIndex = Math.floor(Math.random() * (len - i));
    array.push(tempArr[tempIndex]);
    tempArr.splice(tempIndex, 1);
    i++;
  }
  // there are A(len, len) different arrays
  callback(array);
}

function getSequence(callback) {
  var array;
  getRandomArr(5, function(arr) { array = arr; }); // total A(5, 5) or 120 possibilities

  var seqMap = ['A', 'B', 'C', 'D', 'E'];
  var letterSeq = [];
  for (var i = 0; i < array.length; i++) {
    letterSeq.push(seqMap[array[i]]);
  }

  var seq = {
    number: array,
    letter: letterSeq
  };

  callback(null, seq);
}
