var playerObject = null;
var animate;
var obstacleObject = null;

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
  
function topControl() {
  playerObject.style.bottom = parseInt(playerObject.style.bottom) + 50 + 'px';
  playerObject.style.left = parseInt(playerObject.style.left) + 30 + 'px';
  if(playerObject.style.bottom >= 50 + 'px') {
    var delay = setInterval(moveToBottom,50);
    function moveToBottom() {
        playerObject.style.bottom = parseInt(playerObject.style.bottom) + -10 + 'px';
        console.log(playerObject.style.bottom);
        if(parseInt(playerObject.style.bottom) == 0) { 
          clearInterval(delay);
        }
    }        
  }
}
 
document.body.onkeydown = function(e) {
  if(e.keyCode == 32) {
    topControl();
  }
}

var startGame = function() {
  animate = setInterval(animateObstacle, 10);
}
 
function animateObstacle() {
  obstacle.style.left = parseInt(obstacle.style.left) + -1 + 'px';      
  
	if(obstacle.style.left == 0 + 'px') {
    obstacle.style.left = 400 + 'px';
  }
  
	obstacle.style.width = Math.floor(Math.random()*10) + 'px';
  
	var playerPos = playerObject.style.left;
  var obstaclePos = obstacle.style.left;
  
  detectCollision(playerPos, obstaclePos);
}

var detectCollision = function(playerPos, obstaclePos) {
  let player = playerPos;
  let obstacle = obstaclePos;
  // console.log(player +" "+ obstacle);
  if(player == obstacle) {
    alert("Game Over");
    location.reload();
  }     
}  

/* function dynamicObstacle() {
  var newObstacle = document.createElement("div");
  newObstacle.classList.add("dynamicobstacle");
  newObstacle.style.width = 10 + 'px';
  newObstacle.style.height = 50 + 'px';
  newObstacle.style.
  var currentDiv = document.getElementById("box");
  currentDiv.after(newObstacle);
} */
