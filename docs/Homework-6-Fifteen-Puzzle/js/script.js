/* script.js, the javascript for index.html, created by Yongye Fan, 08/11/2018 */
// default global variables
var dimension = 4;
var picLength = 360;
var picUrl = "./asserts/images/Riven.jpg";
var ifStart = false;
var online;
var time;
var timer;

function addJigsawPart() {
  var $jigsawPart = $("<div></div>");
  $jigsawPart.attr("id", "jigsaw-part").addClass("jigsaw-area");
  $jigsawPart.width(picLength + 5 + 1).height(picLength + 5 + 1);

  $("#game-area").append($jigsawPart);
}

// divide the pic into jigsaw
function divide() {
  var sideLen = picLength / dimension;

  function addDiv(i) {
    var $divPart = $("<div></div>");
    $divPart.addClass("div-part").attr("no", i).width(sideLen).height(sideLen);

    var $tip = $("<div></div>");
    $tip.html(i + 1).addClass("tips").width(sideLen / 4).height(sideLen / 4);
    if ($("#tips").attr("show") == "no") $tip.css("opacity", 0);
    else $tip.css("opacity", 1);

    $divPart.append($tip);

    var posX = (i % dimension) * sideLen;
    var posY = parseInt(i / dimension) * sideLen;
    var leftValue = (i % dimension) * (sideLen + 1);
    var topValue = parseInt(i / dimension) * (sideLen + 1);

    $divPart.attr({
      "left": leftValue,
      "top": topValue
    });

    $divPart.css({
      "background-image": "url(" + picUrl + ")",
      "background-position": -posX + "px " + -posY + "px",
      left: leftValue + "px",
      top: topValue + "px",
      opacity: ".4"
    });

    if (i == Math.pow(dimension, 2) - 1) $divPart.css("opacity", 0);
    else $divPart.animate({opacity: ".9"}, 500);

    $("#jigsaw-part").append($divPart);
  }

  for (var i = 0; i < Math.pow(dimension, 2); i++) addDiv(i);
}

function addPicList() {
  // default
  var picNumOneList = 4;
  var picNameLeftList = ["Riven", "Fiora", "Kaisa", "Ashe"];
  var picNameRightList = ["Akali", "Irelia", "Yi", "Lucian"];
  var sideLen = picLength / picNumOneList;
  var $jigsawPart = $("#jigsaw-part");

  function addPic(i, nameArr, pos) {
    var $picButton = $("<button></button>");
    $picButton.addClass("pic-button").width(sideLen).height(sideLen);
    $picButton.attr("name", nameArr[i]);

    var posValue = (i % 2 == 0) ? -sideLen * 1.5 : -sideLen * 3;
    var topValue = i * (sideLen + 2 + 4);

    $picButton.css({
      "background-image": "url(./asserts/images/" + $picButton.attr("name") + ".jpg)",
      top: topValue + "px"
    }).css(pos, posValue + "px");

    $jigsawPart.append($picButton);
  }

  // Add left list
  for (var i = 0; i < picNumOneList; i++) addPic(i, picNameLeftList, "left");
  // Add right list
  for (var j = 0; j < picNumOneList; j++) addPic(j, picNameRightList, "right");
}

function changePic(event) {
  var $target = $(event.target);
  if (!$target.is("button")) return;

  // recover time
  clearInterval(timer);
  time = -1;
  timing();

  var $divParts = $("#jigsaw-part").find("div").not(".tips");

  picUrl = "./asserts/images/" + $target.attr("name") + ".jpg";

  $divParts.remove();
  divide();
  choosePic();

  ifStart = false;
}

// the pic chosen can be highlighted
function choosePic() {
  var $picButtons = $("#jigsaw-part").find("button");

  for (var i = 0; i < $picButtons.length; i++) {
    if ($picButtons.eq(i).hasClass("pic-chosen")) {
      $picButtons.eq(i).removeClass("pic-chosen");
      break;
    }
  }

  for (var j = $picButtons.length - 1; j >= 0; j--) {
    if (picUrl.indexOf($picButtons.eq(j).attr("name")) != -1) {
      $picButtons.eq(j).addClass("pic-chosen");
      break;
    }
  }
}

function ifAdjacent(divIndex1, divIndex2) {
  var $divParts = $("#jigsaw-part").find("div").not(".tips");
  var div1 = $divParts.eq(divIndex1);
  var div2 = $divParts.eq(divIndex2);
  var interval = picLength / dimension + 1;

  var leftDiffer = parseInt(div1.attr("left")) - parseInt(div2.attr("left"));
  var topDiffer = parseInt(div1.attr("top")) - parseInt(div2.attr("top"));

  return (leftDiffer == 0 && topDiffer == interval) ||
         (leftDiffer == 0 && topDiffer == -interval) ||
         (leftDiffer == interval && topDiffer == 0) ||
         (leftDiffer == -interval && topDiffer == 0);
}

// Exchange the positions of the blank and one div part
function divExchange(divIndex, blankIndex, divPart, blank) {
  if (blankIndex != 0) {
    var preBlank = blank.prev();
    divPart.before(blank);
    preBlank.after(divPart);
  } else {
    var afterDivPart = divPart.next();
    blank.before(divPart);
    afterDivPart.before(blank);
  }

  var tempLeft = divPart.attr("left");
  var tempTop = divPart.attr("top");

  divPart.animate({
    left: blank.attr("left") + "px",
    top: blank.attr("top") + "px"
  }, 200);

  divPart.attr({
    "left": blank.attr("left"),
    "top": blank.attr("top")
  });

  blank.css({
    left: tempLeft + "px",
    top: tempTop + "px"
  });

  blank.attr({
    "left": tempLeft,
    "top": tempTop
  });
}

function move(event) {
  var $target = $(event.target);
  if (!$target.is("div")) return;

  if ($target.is(".tips")) $target = $target.parent();

  var $divParts = $("#jigsaw-part").find("div").not(".tips");
  var blankNo = Math.pow(dimension, 2) - 1;
  var $blank = $divParts.filter("[no=" + blankNo + "]");
  var divIndex = 0;
  var blankIndex = 0;

  for (var i = 0; i < Math.pow(dimension, 2); i++) {
    if ($divParts.eq(i).attr("no") == $target.attr("no"))
      divIndex = i;
    else if ($divParts.eq(i).attr("no") == $blank.attr("no"))
      blankIndex = i;
  }

  if (ifAdjacent(divIndex, blankIndex) && ifStart) {
    // Exchange
    divExchange(divIndex, blankIndex, $target, $blank);
  }
}

function voicePrompt(tag) {
  var $divParts = $("#jigsaw-part").find("div").not(".tips");
  var $picButtons = $("#jigsaw-part").find("button");
  var picName;

  for (var i = 0; i < $picButtons.length; i++) {
    if ($picButtons.eq(i).hasClass("pic-chosen")) {
      picName = $picButtons.eq(i).attr("name");
      break;
    }
  }

  for (var j = 0; j < Math.pow(dimension, 2); j++) {
    if ($divParts.eq(j).attr("no") != j) return;
  }

  var voiceUrl = "https://reganfan.github.io/LearningWeb2.0/docs/Homework-6-Fifteen-Puzzle/asserts/audio/" +
                 picName + "_" + tag + ".mp3";

  var audio = new AudioContext();

  /* loadSound
   * function: load sound from url
   * source: https://jingyan.baidu.com/article/9c69d48fe16ac313c9024efe.html
   * thank caoshixuan100 for sharing
   */
  (function loadSound(url) {
    var req = new XMLHttpRequest();

    req.open('GET', url, true);
    req.responseType = 'arraybuffer';

    req.onload = function() {
      audio.decodeAudioData(req.response, function(buffer) {
        var source = audio.createBufferSource();
        source.buffer = buffer;
        source.connect(audio.destination);
        source.start(0);
      }, function(error) { console.info("Error!"); });
    };

    req.send();
  })(voiceUrl);
}

function timing() {
  var $timeBar = $("#time-bar");
  var $minute = $("<span></span>");
  var $second = $("<span></span>");
  var minute = 0;
  var second = 0;

  $timeBar.find("span").filter(".minute").remove();
  $timeBar.find("span").filter(".second").remove();

  time++;

  minute = parseInt(time / 60);
  second = time % 60;

  if (minute < 10) $minute.html("0" + minute);
  else $minute.html(minute);

  if (second < 10) $second.html("0" + second);
  else $second.html(second);

  $minute.addClass("minute");
  $second.addClass("second");
  $timeBar.prepend($minute).append($second);
}

// Fisher-Yates shuffle
// Thank https://www.zhihu.com/question/68330851
Array.prototype.shuffle = function() {
  var array = this;
  var len = array.length;
  var temp, tail;

  while (len) {
    tail = Math.floor(Math.random() * (len - 1));
    temp = array[len - 1];
    array[len - 1] = array[tail];
    array[tail] = temp;
    len--;
  }

  return array;
};

// Thank http://www.baike.com/wiki/%E4%B8%8D%E5%8F%AF%E8%BF%98%E5%8E%9F%E7%9A%84%E6%8B%BC%E5%9B%BE
function canRestore(array) {
  var reversePair = 0;
  for (var i = 0; i < array.length; i++) {
    for (var j = i + 1; j < array.length; j++) {
      if (array[j] < array[i]) reversePair++;
    }
  }

  return (reversePair % 2 == 0);
}

function restart() {
  // voice prompts for starting
  if (window.AudioContext && online) voicePrompt("start");

  // recover time
  clearInterval(timer);
  time = -1;
  timing();

  var $jigsawPart = $("#jigsaw-part");
  var $divParts = $jigsawPart.find("div").not(".tips");
  $divParts.remove();

  // How to create an array with length of 100 without loops
  // Thank https://github.com/N-ZOO/everycode/issues/19 and tianzi77
  var arr = Array(Math.pow(dimension, 2) - 1).join(",").split(",").map(function(key, index) {
    return index;
  });
  arr.shuffle();

  while (!canRestore(arr)) {
    arr.shuffle();
  }
  arr.push(Math.pow(dimension, 2) - 1);

  // Moving div parts according to the array / changing the div part positions first
  var sideLen = picLength / dimension;
  var leftValue, topValue, aDivPart;

  for (var i = 0; i < Math.pow(dimension, 2); i++) {
    leftValue = (i % dimension) * (sideLen + 1);
    topValue = parseInt(i / dimension) * (sideLen + 1);
    aDivPart = $divParts.filter("[no=" + arr[i] +"]");

    aDivPart.attr({
      "left": leftValue,
      "top": topValue
    });

    aDivPart.animate({
      left: leftValue + "px",
      top: topValue + "px"
    }, 200);

    $jigsawPart.append(aDivPart);
  }

  // timing start
  time = 0;
  timer = setInterval(timing, 1000);

  ifStart = true;
}

function win() {
  var $divParts = $("#jigsaw-part").find("div").not(".tips");

  if (ifStart) {
    for (var i = 0; i < Math.pow(dimension, 2); i++) {
      if ($divParts.eq(i).attr("no") != i) return;
    }

    // voice prompts for ending
    if (window.AudioContext && online) voicePrompt("end");
    else
      setTimeout(function() {
        alert("You Win!");
      }, 200);
    clearInterval(timer);
    ifStart = false;
  }
}

function initialize() {
  // default
  // tips do not show
  $("#tips").attr("show", "no");

  addJigsawPart();
  addPicList();
  divide();
  choosePic();

  // initialize time
  time = -1;
  timing();

  ifStart = false;

  // check if the Internet has been connected
  // Thank https://stackoverflow.com/questions/14283124/navigator-online-not-always-working
  (function isOnline() {
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHttp");
    xhr.onload = function() { online = true; };
    xhr.onerror = function() { online = false; };
    xhr.open("GET", "https://reganfan.github.io/LearningWeb2.0/docs/Homework-6-Fifteen-Puzzle/asserts/audio/Riven_start.mp3", true);
    xhr.send();
  })();

  $("#jigsaw-part").click(move).mouseover(win).click(changePic);
}

function changeLevel() {
  if (dimension != 5) dimension++;
  else dimension = 3;

  $("#jigsaw-part").find("div").not(".tips").remove();

  divide();

  // recover time
  clearInterval(timer);
  time = -1;
  timing();

  ifStart = false;
}

function showTips() {
  var $tips = $("#jigsaw-part").find("div").filter(".tips");
  var $tipButton = $("#tips");
  var ifShow = $tipButton.attr("show");

  if (ifShow == "no") {
    $tips.css("opacity", 1);
    $tipButton.empty();
    $tipButton.attr("show", "yes").html("关闭提示");
  } else {
    $tips.css("opacity", 0);
    $tipButton.empty();
    $tipButton.attr("show", "no").html("开启提示");
  }
}

function gameStart() {
  initialize();

  $("#tips").click(showTips);
  $("#start").click(restart);
  $("#level").click(changeLevel);
}

$(document).ready(gameStart);
