let colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var index = 0;

$(document).keydown(function (e) {

  if ((e.key == "a" || e.key == "A") && !gameStarted) {
    gameStarted = true;
    nextSequence();
  }

});

function nextSequence() {

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  randomColor = colors[randomNumber];
  gamePattern.push(randomColor);

  delayedLoop();

  userClickedPattern = [];

}

function checkAnswer(color, index) {
  return color == gamePattern[index];
}

$(".btn").click(function () {

  var pressedColor = $(this).attr("id");

  userClickedPattern.push(pressedColor);

  if (checkAnswer(userClickedPattern[index], index)) {
    index++;
  } else {

    $("body").addClass("game-over");
    new Audio("./sounds/wrong.mp3").play();

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    gameStarted = false;
    level = 0;
    gamePattern = [];
    return;

  }

  animatePress(pressedColor);
  playSound(pressedColor);

  if (index == gamePattern.length) {
    setTimeout(nextSequence, 700);
    index = 0;
  }

});

function animatePress(key) {
  $("#" + key).addClass("pressed");

  setTimeout(function () {
    $("#" + key).removeClass("pressed");
  }, 100);
}

function playSound(key) {
  new Audio("./sounds/" + key + ".mp3").play();

}

function delayedLoop() {
  let idx = 0;
  function iterate() {
    if (idx < gamePattern.length) {
      animatePress(gamePattern[idx]);
      playSound(gamePattern[idx]);

      idx++;

      setTimeout(iterate, 800);
    }
  }

  iterate();
  
}
