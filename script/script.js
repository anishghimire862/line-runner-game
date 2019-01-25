var playerObject = null;
var animate;
var obstacleObject = null;
var points = 0;
var o1 = null;
playerObject = document.getElementById("player");
// obstacleObject = document.getElementById("obstacle");

playerObject.style.position = "relative";
playerObject.style.left = "10px";
playerObject.style.bottom = "0px";

// obstacleObject.style.position = "relative";
// obstacleObject.style.left = "400px";
// obstacleObject.style.height = "30px";

// dynamic div

var newObstacle = document.createElement("div");
newObstacle.id = "obstacle";
function dynamicObstacle() {
	newObstacle.classList.add("dynamicobstacle");
  newObstacle.style.position = "relative";
  newObstacle.style.left = 400 + 'px';
	newObstacle.style.height = 30 + 'px';
  newObstacle.style.bottom = -40 + 'px';

  let obstacleWidth = Math.floor(Math.random()*30);
  if(obstacleWidth <= 9) {
    newObstacle.style.width = 10 + 'px';
	} else {
		newObstacle.style.width = obstacleWidth + 'px';
  }

  var currentDiv = document.getElementById("box");
  currentDiv.after(newObstacle);
  return newObstacle;
}

var o1 = dynamicObstacle();

function generateObstacle() {
  dynamicObstacle();
	setInterval(function() {
    dynamicObstacle();
  },
    7000);
}

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
  playerObject.style.bottom = parseInt(playerObject.style.bottom) + 60 + 'px';
  playerObject.style.left = parseInt(playerObject.style.left) + 30 + 'px';
  var delay = setInterval(
		function() {
    	moveToBottom(delay) 
		},
	70);
}
 

document.body.onkeydown = function(e) {
  if(e.keyCode == 32) {
    topControl();
  }
}

function startGame() {
  animate = setInterval(animateObstacle, 10);
}
 
function animateObstacle() {
  o1.style.left = parseInt(o1.style.left) + -1 + 'px';      
	if(o1.style.left == 0 + 'px') {
    points++;
    o1.style.left = 400 + 'px';
  }
  
	// obstacle.style.width = Math.floor(Math.random()*10) + 'px';
  
	var playerLeft = playerObject.style.left;
  var obstacleLeft = o1.style.left;
  var obstacleHeight = o1.style.height;
  var playerBottom = playerObject.style.bottom;
  detectCollision(playerLeft, obstacleLeft, obstacleHeight, playerBottom);
}

var detectCollision = function(playerLeft, obstacleLeft, obstacleHeight, playerBottom) {
	if(playerLeft == obstacleLeft) {
 		if(playerBottom <= 30 + 'px') {
      alert("Game Over!! You scored " + points + " points.");
      location.reload();
    }
	}
}  


