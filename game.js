var pattern = [];
var clickedPattern = [];
var colors = ["green", "red", "yellow", "blue"];
var level = 0;
var started = false;

$(document).keypress( function(){
  if(!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function(){
  var selectedColor = $(this).attr("id");
  clickedPattern.push(selectedColor);
  animate(selectedColor);
  makeSound(selectedColor);
  checkAnswer(clickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(clickedPattern[currentLevel] === pattern[currentLevel]){
   if (clickedPattern.length === pattern.length) {

      nextSequence();
          }
   }
   else{
     $("#level-title").text("game over, press any key to start over");
     $("body").addClass(".game-over");
     setTimeout(function(){
       $("body").removeClass(".game-over");
     }, 200);
     makeSound("wrong");
     startOver();
   }
}

function nextSequence(){
  clickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var color = colors[randomNumber];
  pattern.push(color);
  makeSound(color);
  animate(color);
  level++;
  $("#level-title").text("level " + level);
}

function makeSound(color){
  var sound = new Audio( color + ".mp3");
  sound.play();
}

function animate(color){
  $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#" + color).addClass(".pressed");
  setTimeout(function(){
    $("#" + color).removeClass(".pressed")}, 200);
  }

function startOver()
{
  started = false;
  level = 0;
  pattern = [];
  $("body").removeClass(".game-over");
}
