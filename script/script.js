var playerObject = null;
var animate;
var points = 0;
var sizes = [
	30,
	25,
	20,
	15
];
var colors = [
	'red',
	'green',
	'blue',
	'purple'
];
var left = [
  400,
	300,
	200,
	150
];
var obstacles = [];
var o1 = null;
playerObject = document.getElementById("player");

playerObject.style.position = "relative";
playerObject.style.left = "50px";
playerObject.style.bottom = "0px";
playerObject.style.width = "10px";
playerObject.style.height = "10px";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// dynamic div
// newObstacle.id = "obstacle";
function dynamicObstacle() {
	let i = Math.floor(Math.random()*4);
	var newObstacle = document.createElement("div");

	newObstacle.classList.add("dynamicobstacle");
  newObstacle.style.position = "relative";
	newObstacle.style.height = 30 + 'px';
  newObstacle.style.bottom = -40 + 'px';
  newObstacle.style.display = 'inline-block';
  newObstacle.style.left = left[i] + 'px';
	newObstacle.style.minWidth = sizes[i] + 'px';
  newObstacle.style.backgroundColor = colors[i]
  var currentDiv = document.getElementById("box");
  currentDiv.after(newObstacle);
	// return newObstacle;
	let obstacle = newObstacle;
	if(obstacles.length == 2) { 
		obstacles = [];
		obstacles.push(obstacle);
	}
  else 
	  obstacles.push(obstacle);
 
}
// var o1 = dynamicObstacle();

function generateObstacle() {
/*	var obstacleInterval1 = setInterval(function() {
    dynamicObstacle();
  },
    6000);
*/
	dynamicObstacle();
	dynamicObstacle();
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
/*
  o1.style.left = parseInt(o1.style.left) + -1 + 'px';      
	if(o1.style.left == 0 + 'px') {
    // clearInterval(obstacleInterval);
    
    points++;
    o1.style.left = 400 + 'px';
  }
*/
	var o1 = null;
	for(var i=0; i<obstacles.length; i++) {
		obstacles[i].style.left = parseInt(obstacles[i].style.left) + -1 + 'px';
		o1 = obstacles[i];  
		if(o1.style.left == 0 + 'px') {
    	o1.style.left = getRandomInt(150,400) + 'px';
		}
    var playerLeft = playerObject.style.left;
		var playerWidth = playerObject.style.width;
    var obstacleLeft = o1.style.left;
    var obstacleHeight = o1.style.height;
    var obstacleWidth = o1.style.minWidth;
		var obstacleBottom = o1.style.bottom;
		var playerBottom = playerObject.style.bottom;
		var playerHeight = playerObject.style.height;
    detectCollision(playerLeft, obstacleLeft, obstacleHeight, obstacleWidth, obstacleBottom, playerWidth, playerBottom, playerHeight);
  }
}

var detectCollision = function(playerLeft, obstacleLeft, obstacleHeight, obstacleWidth, obstacleBottom, playerBottom, playerWidth, playerHeight) {
	// console.log("player left "+ playerLeft + "obstacle left"+ obstacleLeft);
	// console.log("player bottom" +playerBottom);

/*	if(playerLeft == obstacleLeft) {
		if(playerBottom <= 30 + 'px') {
      alert("Game Over!! You scored " + points + " points.");
      location.reload();
    }
	}
*/
		if((playerLeft+playerWidth) >= obstacleLeft && playerLeft < (obstacleLeft+obstacleWidth)) {
		// if(playerBottom+playerHeight >= obstacleBottom && playerBottom < (obstacleBottom + obstacleHeight)) {
				alert("Game over");
				location.reload();
		}
}
