var playerObject = null;
var animate;
var obstacleObject = null;
var points = 0;
playerObject = document.getElementById("player");
obstacleObject = document.getElementById("obstacle");

playerObject.style.position = "relative";
playerObject.style.left = "10px";
playerObject.style.bottom = "0px";

obstacleObject.style.position = "relative";
obstacleObject.style.left = "400px";

// move object to the right direction.
// 10px is incremented at each click.

function rightControl() {
  playerObject.style.left = parseInt(playerObject.style.left) + 10 + 'px';
}   
function moveToBottom(delay) {
      if(playerObject.style.bottom > 0 + 'px') {
        playerObject.style.bottom = parseInt(playerObject.style.bottom) + -10 + 'px';
      }
      if(parseInt(playerObject.style.bottom) == 0) { 
        clearInterval(delay);
      }
  }
  
function topControl() {
  playerObject.style.bottom = parseInt(playerObject.style.bottom) + 50 + 'px';
  playerObject.style.left = parseInt(playerObject.style.left) + 30 + 'px';
  var delay = setInterval(
		function() {
    	moveToBottom(delay) 
		},
	50);
}
 

document.body.onkeydown = function(e) {
  if(e.keyCode == 32) {
    topControl();
  }
}

function startGame() {
  animate = setInterval(animateObstacle, 100);
}
 
function animateObstacle() {
  obstacle.style.left = parseInt(obstacle.style.left) + -1 + 'px';      
  
	if(obstacle.style.left == 0 + 'px') {
    points++;
    obstacle.style.left = 400 + 'px';
  }
  
	// obstacle.style.width = Math.floor(Math.random()*10) + 'px';
  
	var playerPos = playerObject.style.left;
  var obstaclePos = obstacle.style.left;
  
  detectCollision(playerPos, obstaclePos);
}

var detectCollision = function(playerPos, obstaclePos) {
  if(playerPos == obstaclePos) {
    alert("Game Over!! You scored " + points + " points.");
    location.reload();
  }     
}  


/*
function dynamicObstacle() {
  var newObstacle = document.createElement("div");
  newObstacle.classList.add("dynamicobstacle");
  newObstacle.style.width = 10 + 'px';
  newObstacle.style.height = 50 + 'px';
  newObstacle.style.bottom = -40 + 'px';
  var currentDiv = document.getElementById("box");
  currentDiv.after(newObstacle);
} */
