// script.js, the javascript file for index.html, created by Yongye Fan, 21/10/2018
// global variables
var time = 31;          // record the time
var score = 0;          // record the score
var pause = 0;          // if game has started, you press the stop game button, pause is 1, then press the button again, it turns 0
var timingStart = 0;    // record the timerID of timing function

window.onload = function() {
  createMoles();

  document.getElementById("start-stop-button").onmousedown = function() {
    this.className = "press-down";
  };
  document.getElementById("start-stop-button").onmouseup = function() {
    this.className = "press-up";
  };
  document.getElementById("start-stop-button").addEventListener("click", gameStart);

  document.getElementById("game-area").addEventListener("click", hit);
};

// create 60 moles in the game area
function createMoles() {
  var gameArea = document.getElementById("game-area");

  for (var i = 0; i < 60; i++) {
    var mole = document.createElement("button");
    mole.className = "moles";
    gameArea.appendChild(mole);
  }
}

function gameStart() {
  if (time == 31 || time == 0) {
    // if new game starts after pressing start game button
    if (time == 0) {
      // reset time and score
      time = 31;
      score = 0;
    }

    document.getElementById("game-over").className = "hide-game-state";
    document.getElementById("play").className = "show-game-state";
    document.getElementById("score").textContent = score;
    timingStart = setInterval(timing, 1000);
    timing();
    selectMole();
  } else if (pause == 0) {
    // if no pause
    document.getElementById("play").className = "hide-game-state";
    document.getElementById("pause").className = "show-game-state";
    clearInterval(timingStart);
    pause = 1;
  } else if (pause == 1) {
    // if pause
    document.getElementById("play").className = "show-game-state";
    document.getElementById("pause").className = "hide-game-state";
    timingStart = setInterval(timing, 1000);
    pause = 0;
  }
}

// the timer function
function timing() {
  if (time != 0) time--;
  else {
    // if game over, alert info and reset all moles
    clearInterval(timingStart);
    document.getElementById("play").className = "hide-game-state";
    document.getElementById("game-over").className = "show-game-state";
    resetMole();
    alert("Game Over!\nYour score is " + score + ".");
  }

  document.getElementById("time").textContent = time;
}

// choose one mole from 60 moles randomly
function selectMole() {
  var selectMoleNum = Math.floor(Math.random() * 60);

  var moles = document.getElementById("game-area").getElementsByTagName("button");
  moles[selectMoleNum].className += " mole-selected";
}

// if hit the true mole, score and the mole turns gray, then choose next mole
function hit() {
  if (time != 31 && time != 0 && pause != 1 && event.target.className.indexOf("moles") != -1) {
    if (event.target.className.indexOf("mole-selected") != -1) {
      score++;
      event.target.className = "moles";
      selectMole();
    } else score--;

    document.getElementById("score").textContent = score;
  }
}

// reset, all moles will turn back to gray
function resetMole() {
  var moles = document.getElementById("game-area").getElementsByTagName("button");

  for (var i = moles.length - 1; i >= 0; i--) {
    if (moles[i].className.indexOf("mole-selected")) moles[i].className = "moles";
  }
}
