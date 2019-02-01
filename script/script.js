var playerObject = null;
var animate;
var gameOver = false;
var score = 0;
var leftPos = 400;
var highScore = 0;
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
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
		let previous = random;
		if(random == previous && random >= 380) 
			random -= 50;
		return random;
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
  newObstacle.style.left = leftPos + 'px';
	leftPos = 250;
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
  if(e.keyCode == 38) {
    topControl();
  }
	if(e.keyCode == 32) {
		startGame();
	}
}

function startGame() {
  animate = setInterval(animateObstacle, 5);
	playerAnimate = setInterval(animatePlayer, 100);
	document.getElementById("startGameBtn").disabled = true;
}
 
function animateObstacle() {
	var o1 = null;
	for(var i=0; i<obstacles.length; i++) {
		obstacles[i].style.left = parseInt(obstacles[i].style.left) + -1 + 'px';
		o1 = obstacles[i];  
		if(o1.style.left == 0 + 'px') {
    	o1.style.left = getRandomInt(200,400) + 'px';
		}
  }
    detectCollision();
		scoreCounter();
}

var detectCollision = function() {
	var playerLeft = parseInt(playerObject.style.left);
  var playerWidth = parseInt(playerObject.style.width);
  var obstacle1left = parseInt(obstacles[0].style.left);
  var obstacle1height = parseInt(obstacles[0].style.height);
  var obstacle1width = parseInt(obstacles[0].style.minWidth);
  var obstacle1bottom = parseInt(obstacles[0].style.bottom);

  var obstacle2left = parseInt(obstacles[1].style.left);
  var obstacle2height = parseInt(obstacles[1].style.height);
  var obstacle2width = parseInt(obstacles[1].style.minWidth);
  var obstacle2bottom = parseInt(obstacles[1].style.bottom);
  var playerBottom = parseInt(playerObject.style.bottom);
  var playerHeight = parseInt(playerObject.style.height);
	if(playerBottom <= 28) {
    if((playerLeft+playerWidth) - (obstacle1left+obstacle1width) == 0 ||
		  (playerLeft+playerWidth) - (obstacle2left+obstacle2width) == 0) {
      alert("May be a collision. -- left");
			location.reload();
    }
  }

	if((obstacle1left >= 50 && obstacle1left <= 60) || (obstacle2left >= 50 && obstacle2left <=60)) {
		if(playerBottom > 28) {
			if((playerBottom-obstacle1height == 0) && 
				(playerBottom-obstacle2height == 0)) {
		  	alert('top collision');
      	location.reload();
    	}
		}
	}
}
function scoreCounter() {
	if(parseInt(obstacles[0].style.left) == parseInt(playerObject.style.left) ||
		parseInt(obstacles[1].style.left) == parseInt(playerObject.style.left)) {
		score++;		
	}
	document.getElementById("score").innerHTML = score;
}
