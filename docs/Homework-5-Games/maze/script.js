/* script.js, the javascript for index.html, created by Yongye Fan, 20/10/2018 */

// global variables
// ifStart, if game starts, ifStart = 1, else 0
var ifStart = 0;
// ifEnd, if game ends, like touching the walls or the end, ifEnd = 1, else 0
var ifEnd = 0;
// outOfGameArea, if mouse cursor is not inside the game area, it is 1, else 0
var outOfGameArea = 1;
// result, recording the result, like win, lose and cheat
var result = "";

window.onload = function() {
  document.getElementById("start").addEventListener("mouseover", gameStart);

  document.getElementById("game-area").addEventListener("mouseover", gameEnd);
  document.getElementById("game-area").addEventListener("mouseleave", gameReset);

  var allWalls = document.getElementsByTagName("li");
  for (var i = 0; i < allWalls.length; i++) {
    if (i != 0 && i != 2 && i != 7) {
      allWalls[i].addEventListener("mouseover", gameLose);
    }
  }

  document.getElementById("end").addEventListener("mouseover", gameWin);
  document.getElementById("end").addEventListener("mouseover", gameCheat);
};

// When you touch the start area, the game starts
function gameStart() {
  // initialize the states and variables
  // the result will also reset and hide
  if (result == "win") {
    document.getElementById("win").className = "";
  } else if (result == "lose") {
    document.getElementById("lose").className = "";
  } else if (result == "cheat") {
    document.getElementById("cheat").className = "";
  }

  // if some walls are still red, reset
  var allWalls = document.getElementsByTagName("li");

  for (var i = 0; i < allWalls.length; i++) {
    if (allWalls[i].className.indexOf("walls-touch") != -1) {
      allWalls[i].className = "walls";
    }
  }

  ifStart = 1;
  ifEnd = 0;
  outOfGameArea = 0;
  result = "";
}

// When you leave the game area(the maze), the game resets, red wall turns gray
function gameReset() {
  outOfGameArea = 1;

  var allWalls = document.getElementsByTagName("li");

  for (var i = 0; i < allWalls.length; i++) {
    if (allWalls[i].className.indexOf("walls-touch") != -1) {
      allWalls[i].className = "walls";
    }
  }
}

// if game has started, and you touch the walls, you lose, the wall will turn red
function gameLose() {
  if (ifStart == 1 && event.target.className == "walls" && outOfGameArea != 1) {
    event.target.className += " walls-touch";
    ifStart = 0;
    ifEnd = 1;
    result = "lose";
  }
}

// if game has started, and you reach the end without moving out of the game area,
// you will win
function gameWin() {
  if (ifStart == 1 && outOfGameArea != 1) {
    ifStart = 0;
    ifEnd = 1;
    result = "win";
  }
}

// if game has started, and you reach the end but you have moved out of the game area once,
// you will cheat, or you touch directly the end area but haven't touched the start area before,
// you may also cheat
function gameCheat() {
  if (outOfGameArea == 1) {
    if (ifEnd == 0) {
      ifStart = 0;
      ifEnd = 1;
      result = "cheat";
    } else {
      // if last game ends, the last result must reset first
      document.getElementById(result).className = "";

      ifStart = 0;
      result = "cheat";
    }
  }
}

// game ends and the result shows
function gameEnd() {
  if (ifEnd == 1) {
    if (result == "win") {
      document.getElementById("win").className = "show-result";
    } else if (result == "lose") {
      document.getElementById("lose").className = "show-result";
    } else if (result == "cheat") {
      document.getElementById("cheat").className = "show-result";
    }
  }
}
