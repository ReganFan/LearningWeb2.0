/* script.js, the javascript for index.html, created by Yongye Fan, 08/11/2018 */
// default global variables
var dimension = 4;
var picLength = 360;
var picUrl = "./asserts/images/Riven.jpg";
var ifStart = false;

function addJigsawPart() {
  $("#jigsaw-part").remove();

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
      top: topValue + "px"
    });

    if (i == Math.pow(dimension, 2) - 1) $divPart.css("opacity", 0);

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

  var $divParts = $("#jigsaw-part").find("div");

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
  var $divParts = $("#jigsaw-part").find("div");
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

function move(event) {
  var $target = $(event.target);
  if (!$target.is("div")) return;

  var $divParts = $("#jigsaw-part").find("div");
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
    if (blankIndex != 0) {
      var preBlank = $blank.prev();
      $target.before($blank);
      preBlank.after($target);
    } else {
      var afterTarget = $target.next();
      $blank.before($target);
      afterTarget.before($blank);
    }

    var tempLeft = $target.attr("left");
    var tempTop = $target.attr("top");

    $target.animate({
      left: $blank.attr("left") + "px",
      top: $blank.attr("top") + "px"
    }, 200);

    $target.attr({
      "left": $blank.attr("left"),
      "top": $blank.attr("top")
    });

    $blank.css({
      left: tempLeft + "px",
      top: tempTop + "px"
    });

    $blank.attr({
      "left": tempLeft,
      "top": tempTop
    });
  }
}

function voicePrompt(tag) {
  var $divParts = $("#jigsaw-part").find("div");
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
  voicePrompt("start");

  var $jigsawPart = $("#jigsaw-part");
  var $divParts = $jigsawPart.find("div");
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

  // Adding div parts according to the array
  var sideLen = picLength / dimension;
  var leftValue, topValue, newDivPart;

  for (var i = 0; i < Math.pow(dimension, 2); i++) {
    leftValue = (i % dimension) * (sideLen + 1);
    topValue = parseInt(i / dimension) * (sideLen + 1);
    newDivPart = $divParts.filter("[no=" + arr[i] +"]");

    newDivPart.attr({
      "left": leftValue,
      "top": topValue
    });

    newDivPart.css({
      left: leftValue + "px",
      top: topValue + "px"
    });

    $jigsawPart.append(newDivPart);
  }

  ifStart = true;
}

function win() {
  var $divParts = $("#jigsaw-part").find("div");

  if (ifStart) {
    for (var i = 0; i < Math.pow(dimension, 2); i++) {
      if ($divParts.eq(i).attr("no") != i) return;
    }

    // voice prompts for ending
    voicePrompt("end");
    // setTimeout(function() {
    //   alert("You Win!");
    // }, 200);
    ifStart = false;
  }
}

function initialize() {
  // default
  addJigsawPart();
  addPicList();
  divide();
  choosePic();

  ifStart = false;

  $("#jigsaw-part").click(move).mouseover(win).click(changePic);
}

function changeLevel() {
  if (dimension != 5) dimension++;
  else dimension = 3;

  initialize();
}

function gameStart() {
  initialize();

  $("#start").click(restart);
  $("#level").click(changeLevel);
}

$(document).ready(gameStart);
