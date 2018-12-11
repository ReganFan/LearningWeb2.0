// index.js, the javascript for index.html, created by Yongye Fan, 10/12/2018
$(function() {
  var options = {
    server: 'http://localhost:3000',
    reset: false,
    xhr: null,            // XMLHttpRequest object
    ifAutoPress: false,   // check if robot press starts
    sequence: null,       // record the random sequence and index
    index: null,
    currentSum: 0         // current sum
  };

  initialize();

  function optionsChange(Options) {
    for (var key in options) {
      options[key] = Options[key];
    }
  }

  function errHandler(err, Message) {
    if (err) {
      console.log(err);
      $('.message').html(Message.message);
      console.log(Message.message);
      options.currentSum = Message.currentSum;
    }
  }

  $('#button').mouseenter(function() {
    start(options, errHandler, optionsChange);
  }).mouseleave(function() {
    reset(options, optionsChange);
  });
});

function initialize() {
  $('#info-bar').addClass('button-disable');
  $('.button').attr('enable', 'yes').addClass('button-enable');
  $('.num').hide();
  $('.icon').addClass('button-enable');
  $('.message').html('');
}

function reset(options, callback) {
  options.reset = true; // reset calculator
  options.ifAutoPress = false;
  options.currentSum = 0;
  if (options.xhr) options.xhr.abort();

  $('#info-bar').attr('class', 'button-disable').off('click');
  $('.button').attr({
    'enable': 'yes',
    class: 'button button-enable'
  }).off('click');
  $('.num').empty().hide();
  $('.sum').empty();
  $('.sequence').html('').hide();
  $('.message').html('');
  $('.icon').removeClass('button-disable').addClass('button-enable');
  $('.apb').off('click');

  callback(options);
}

function start(options, errCallback, callback) {
  $('.button').eq(0).click(function() { aHandler(options, errCallback, callback); });
  $('.button').eq(1).click(function() { bHandler(options, errCallback, callback); });
  $('.button').eq(2).click(function() { cHandler(options, errCallback, callback); });
  $('.button').eq(3).click(function() { dHandler(options, errCallback, callback); });
  $('.button').eq(4).click(function() { eHandler(options, errCallback, callback); });

  $('#info-bar').click(function() {
    bubbleHandler(options, errCallback, callback);
  });

  $('.apb').click(function() {
    robotClick(options, callback);
  });
}

function aHandler(options, errCallback, callback) {
  var $button = $('.button').eq(0);
  var $value = $button.find('.num');
  $value.html('...').show();
  $button.off('click');  // only one click event happens when getting number

  options.reset = false;

  if (!options.ifAutoPress) {    // if user press by himself, disable @ button
    $('.icon').removeClass('button-enable').addClass('button-disable');
    $('.apb').off('click');
  }

  $('.button').not($button).each(function() {
    if ($(this).attr('enable') != 'no') {
      $(this).removeClass('button-enable').addClass('button-disable');
      $(this).off('click');
    }
  });

  options.xhr = $.ajax({
    url: options.server,
    cache: false,
    error: function() { console.log('Calculator resets! Stop request!'); },
    success: function(data) {
      console.log('Get random number for', $button.attr('title'), ':', data);
      $value.html(data);
      options.currentSum = options.currentSum + parseInt(data);
      console.log('Current sum:', options.currentSum);
      enableButtons($button, options, autoPressButton, errCallback, callback); // add autoPressButton as callback

      if (options.ifAutoPress) {
        var successMessage = '这是一个天大的秘密';
        var errorMessage = '这并不是一个天大的秘密';

        if (Math.random() < 0.5) {
          $('.message').html(successMessage);
          console.log(successMessage);
        } else errCallback(new Error('Handle error!'), { message: errorMessage, currentSum: options.currentSum });
      } else $('.message').html('');
    }
  });

  callback(options);
}

function bHandler(options, errCallback, callback) {
  var $button = $('.button').eq(1);
  var $value = $button.find('.num');
  $value.html('...').show();
  $button.off('click');  // only one click event happens when getting number

  options.reset = false;

  if (!options.ifAutoPress) {    // if user press by himself, disable @ button
    $('.icon').removeClass('button-enable').addClass('button-disable');
    $('.apb').off('click');
  }

  $('.button').not($button).each(function() {
    if ($(this).attr('enable') != 'no') {
      $(this).removeClass('button-enable').addClass('button-disable');
      $(this).off('click');
    }
  });

  options.xhr = $.ajax({
    url: options.server,
    cache: false,
    error: function() { console.log('Calculator resets! Stop request!'); },
    success: function(data) {
      console.log('Get random number for', $button.attr('title'), ':', data);
      $value.html(data);
      options.currentSum = options.currentSum + parseInt(data);
      console.log('Current sum:', options.currentSum);
      enableButtons($button, options, autoPressButton, errCallback, callback); // add autoPressButton as callback

      if (options.ifAutoPress) {
        var successMessage = '我不知道';
        var errorMessage = '我知道';

        if (Math.random() < 0.5) {
          $('.message').html(successMessage);
          console.log(successMessage);
        } else errCallback(new Error('Handle error!'), { message: errorMessage, currentSum: options.currentSum });
      } else $('.message').html('');
    }
  });

  callback(options);
}

function cHandler(options, errCallback, callback) {
  var $button = $('.button').eq(2);
  var $value = $button.find('.num');
  $value.html('...').show();
  $button.off('click');  // only one click event happens when getting number

  options.reset = false;

  if (!options.ifAutoPress) {    // if user press by himself, disable @ button
    $('.icon').removeClass('button-enable').addClass('button-disable');
    $('.apb').off('click');
  }

  $('.button').not($button).each(function() {
    if ($(this).attr('enable') != 'no') {
      $(this).removeClass('button-enable').addClass('button-disable');
      $(this).off('click');
    }
  });

  options.xhr = $.ajax({
    url: options.server,
    cache: false,
    error: function() { console.log('Calculator resets! Stop request!'); },
    success: function(data) {
      console.log('Get random number for', $button.attr('title'), ':', data);
      $value.html(data);
      options.currentSum = options.currentSum + parseInt(data);
      console.log('Current sum:', options.currentSum);
      enableButtons($button, options, autoPressButton, errCallback, callback); // add autoPressButton as callback

      if (options.ifAutoPress) {
        var successMessage = '你不知道';
        var errorMessage = '你知道';

        if (Math.random() < 0.5) {
          $('.message').html(successMessage);
          console.log(successMessage);
        } else errCallback(new Error('Handle error!'), { message: errorMessage, currentSum: options.currentSum });
      } else $('.message').html('');
    }
  });

  callback(options);
}

function dHandler(options, errCallback, callback) {
  var $button = $('.button').eq(3);
  var $value = $button.find('.num');
  $value.html('...').show();
  $button.off('click');  // only one click event happens when getting number

  options.reset = false;

  if (!options.ifAutoPress) {    // if user press by himself, disable @ button
    $('.icon').removeClass('button-enable').addClass('button-disable');
    $('.apb').off('click');
  }

  $('.button').not($button).each(function() {
    if ($(this).attr('enable') != 'no') {
      $(this).removeClass('button-enable').addClass('button-disable');
      $(this).off('click');
    }
  });

  options.xhr = $.ajax({
    url: options.server,
    cache: false,
    error: function() { console.log('Calculator resets! Stop request!'); },
    success: function(data) {
      console.log('Get random number for', $button.attr('title'), ':', data);
      $value.html(data);
      options.currentSum = options.currentSum + parseInt(data);
      console.log('Current sum:', options.currentSum);
      enableButtons($button, options, autoPressButton, errCallback, callback); // add autoPressButton as callback

      if (options.ifAutoPress) {
        var successMessage = '他不知道';
        var errorMessage = '他知道';

        if (Math.random() < 0.5) {
          $('.message').html(successMessage);
          console.log(successMessage);
        } else errCallback(new Error('Handle error!'), { message: errorMessage, currentSum: options.currentSum });
      } else $('.message').html('');
    }
  });

  callback(options);
}

function eHandler(options, errCallback, callback) {
  var $button = $('.button').eq(4);
  var $value = $button.find('.num');
  $value.html('...').show();
  $button.off('click');  // only one click event happens when getting number

  options.reset = false;

  if (!options.ifAutoPress) {    // if user press by himself, disable @ button
    $('.icon').removeClass('button-enable').addClass('button-disable');
    $('.apb').off('click');
  }

  $('.button').not($button).each(function() {
    if ($(this).attr('enable') != 'no') {
      $(this).removeClass('button-enable').addClass('button-disable');
      $(this).off('click');
    }
  });

  options.xhr = $.ajax({
    url: options.server,
    cache: false,
    error: function() { console.log('Calculator resets! Stop request!'); },
    success: function(data) {
      console.log('Get random number for', $button.attr('title'), ':', data);
      $value.html(data);
      options.currentSum = options.currentSum + parseInt(data);
      console.log('Current sum:', options.currentSum);
      enableButtons($button, options, autoPressButton, errCallback, callback); // add autoPressButton as callback

      if (options.ifAutoPress) {
        var successMessage = '才怪';
        var errorMessage = '才对';

        if (Math.random() < 0.5) {
          $('.message').html(successMessage);
          console.log(successMessage);
        } else errCallback(new Error('Handle error!'), { message: errorMessage, currentSum: options.currentSum });
      } else $('.message').html('');
    }
  });

  callback(options);
}

// buttons states can't change if reset before GET request finishes
function enableButtons($button, options, autoPressButton, errCallback, callback) {
  if (!options.reset) {
    $button.attr({
      'enable': 'no',
      class: 'button button-disable'
    });

    var disabledButtons = 0;

    $('.button').each(function() {
      if ($(this).attr('enable') != 'no') {
        $(this).removeClass('button-disable').addClass('button-enable');
        disabledButtons++;
      }
    });

    if ($('.button').eq(0).attr('enable') != 'no') $('.button').eq(0).click(function() { aHandler(options, errCallback, callback); });
    if ($('.button').eq(1).attr('enable') != 'no') $('.button').eq(1).click(function() { bHandler(options, errCallback, callback); });
    if ($('.button').eq(2).attr('enable') != 'no') $('.button').eq(2).click(function() { cHandler(options, errCallback, callback); });
    if ($('.button').eq(3).attr('enable') != 'no') $('.button').eq(3).click(function() { dHandler(options, errCallback, callback); });
    if ($('.button').eq(4).attr('enable') != 'no') $('.button').eq(4).click(function() { eHandler(options, errCallback, callback); });

    if (disabledButtons == 0) $('#info-bar').attr('class', 'button-enable');

    autoPressButton(null, options, autoCalculateSum, callback);
  }
}

function bubbleHandler(options, errCallback, callback) {
  var bubble = $('#info-bar');
  if (bubble.hasClass('button-enable')) {
    $('.sum').html(options.currentSum);
    bubble.attr('class', 'button-disable');
    console.log('Sum :', options.currentSum);

    $('.button').each(function() {
      $(this).attr({
        'enable': 'yes',
        class: 'button button-enable'
      });
    });

    $('.button').eq(0).click(function() { aHandler(options, errCallback, callback); });
    $('.button').eq(1).click(function() { bHandler(options, errCallback, callback); });
    $('.button').eq(2).click(function() { cHandler(options, errCallback, callback); });
    $('.button').eq(3).click(function() { dHandler(options, errCallback, callback); });
    $('.button').eq(4).click(function() { eHandler(options, errCallback, callback); });

    $('.icon').removeClass('button-disable').addClass('button-enable');
    $('.apb').click(function() {
      robotClick(options, callback);
    });

    if (options.ifAutoPress) {
      var successMessage = '楼主异步调用战斗力感人，目测不超过' + options.currentSum;
      var errorMessage = '楼主异步调用战斗力爆棚，预测超过了' + options.currentSum;

      setTimeout(function() {
        if (Math.random() < 0.5) {
          $('.message').html(successMessage);
          console.log(successMessage);
        } else errCallback(new Error('Handle error!'), { message: errorMessage, currentSum: options.currentSum });
      }, 500);
    } else $('.message').html('');

    options.currentSum = 0;
    callback(options);
  }
}

function autoPressButton(err, options, autoCalculateSum, callback) {
  if (err) console.log('Auto press button error!');
  else if (options.ifAutoPress) {
    if (options.index < options.sequence.length - 1) {
      $('.button').eq(options.sequence[++options.index]).click();
    } else autoCalculateSum(null, options, callback);

    callback(options);
  }
}

function autoCalculateSum(err, options, callback) {
  if (!err) {
    setTimeout(function() {
      $('#info-bar').click();
      options.ifAutoPress = false;
      $('.sequence').html('').hide();

      callback(options);
    }, 500);
  } else console.log('Robot calculates error!');
}

function robotClick(options, callback) {
  $('.icon').removeClass('button-enable').addClass('button-disable');
  $('.apb').off('click');

  options.ifAutoPress = true;

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

      options.sequence = seq.number;
      options.index = 0;
      $('.button').eq(options.sequence[options.index]).click();
    }
  });

  callback(options);
}

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
