var playerObject = null;
var animate;
var jump = false;
var points = 0;
var sizes = [
	30,
	20,
	10,
	5
];
var colors = [
	'red',
	'green',
	'blue',
	'purple'
];
var left = [
  450,
	250
];
var obstacles = [];
var o1 = null;
var position = -48;
var positionY = -55;
var difference = -16;
playerObject = document.getElementById("player");

playerObject.style.position = "relative";
playerObject.style.left = "50px";
playerObject.style.bottom = "0px";
playerObject.style.width = "16px";
playerObject.style.height = "18px";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animatePlayer() {
	document.getElementById("player").style.backgroundPosition = position +'px ' + positionY +'px';
	if(position > -80) {
		position += difference;
	} else {
		position = -48;
	}
}

// dynamic div
function dynamicObstacle() {
	let i = Math.floor(Math.random()*4);
	let j = Math.floor(Math.random()*2);
	var newObstacle = document.createElement("div");

	newObstacle.classList.add("dynamicobstacle");
  newObstacle.style.position = "relative";
	newObstacle.style.height = 30 + 'px';
  newObstacle.style.bottom = -40 + 'px';
  newObstacle.style.display = 'inline-block';
  newObstacle.style.left = left[j] + 'px';
	newObstacle.style.minWidth = sizes[i] + 'px';
  newObstacle.style.backgroundColor = colors[i]
  var currentDiv = document.getElementById("box");
  currentDiv.after(newObstacle);
	let obstacle = newObstacle;
	if(obstacles.length == 2) { 
		obstacles = [];
		obstacles.push(obstacle);
	}
  else 
	  obstacles.push(obstacle);
 
}

function generateObstacle() {
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
function moveToTop(delayTop) {
	if(parseInt(playerObject.style.bottom) == 0)
	  playerObject.style.bottom = parseInt(playerObject.style.bottom) + 60 + 'px';
	if(parseInt(playerObject.style.bottom) == 60)
		clearInterval(delayTop);
}  
function topControl() {
	var delayTop = setInterval(
    function() {
      moveToTop(delayTop)
    },
  70);

	var delay = setInterval(
		function() {
    	moveToBottom(delay) 
		},
	80);
}
 

document.body.onkeydown = function(e) {
  if(e.keyCode == 32) {
    topControl();
  }
}

function startGame() {
  animate = setInterval(animateObstacle, 5);
	setInterval(animatePlayer, 100);
}
 
function animateObstacle() {
	console.log(animate);
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
    // detectCollision(playerLeft, obstacleLeft, obstacleHeight, obstacleWidth, obstacleBottom, playerWidth, playerBottom, playerHeight);
  }
}

var detectCollision = function(playerLeft, obstacleLeft, obstacleHeight, obstacleWidth, obstacleBottom, playerBottom, playerWidth, playerHeight) {
	if(((parseInt(playerObject.style.bottom))<20) && (parseInt(obstacleWidth)+parseInt(obstacleLeft)) <= (parseInt(playerLeft) + 10)) {
		alert("You're out.");
		location.reload();
	}
}
