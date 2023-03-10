var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var started = false;
var level = 0;
var highscore=0;

// challange 7
$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    
    var userChosenColour= $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


// //challange 8
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over!Press Any Key to Restart!");

      if(level>highscore){
        highscore=level--;
        $("#highscore").text(level);
      }

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 300);

      startOver();
    }
}

function nextSequence() {

    userClickedPattern=[];

    level++;

    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    
    var randomChosenColour= buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
