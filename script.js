var hero = {
  x: 300,
  y: 400,
};

var enemies = [
  { x: 50, y: 50 },
  { x: 150, y: 50 },
  { x: 250, y: 50 },
  { x: 350, y: 50 },
  { x: 450, y: 50 },
  { x: 550, y: 50 },
  { x: 650, y: 50 },
];

var enemies2 = [
  { x: 50, y: 50 },
  { x: 100, y: 50 },
];

var explosion = [];

var bullets = [];

var score = 0;

var winner = [];

function displayHero() {
  document.getElementById("hero").style["top"] = hero.y + "px";
  document.getElementById("hero").style["left"] = hero.x + "px";
}

function displayEnemies() {
  var output = "";
  for (var i = 0; i < enemies.length; i++) {
    output +=
      "<div class='enemy1' style='top:" +
      enemies[i].y +
      "px; left:" +
      enemies[i].x +
      "px;'></div>";
  }
  document.getElementById("enemies").innerHTML = output;
}

function displayExplosion() {
  var output = "";
  for (var i = 0; i < explosion.length; i++) {
    output +=
      "<div class='explode' style='top:" +
      explosion[i].y +
      "px; left:" +
      explosion[i].x +
      "px;'></div>";
  }
  document.getElementById("explosion").innerHTML = output;
}

function displayBullets() {
  var output = "";
  for (var i = 0; i < bullets.length; i++) {
    output +=
      "<div class='bullet' style='top:" +
      bullets[i].y +
      "px; left:" +
      bullets[i].x +
      "px;'></div>";
  }
  document.getElementById("bullets").innerHTML = output;
}

function moveEnemies() {
  var output = "";
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].y += 5;
    if (enemies[i].y > 540) {
      enemies[i].y = 0;
      enemies[i].x = Math.random() * 600;
    }
  }
}

function moveBullets() {
  var output = "";
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].y -= 5;

    if (bullets[i].y < 0) {
      bullets[i] = bullets[bullets.length - 1];
      bullets.pop();
    }
  }
}

function displayScore() {
  document.getElementById("score").innerHTML = score;
  // Check if the score is 70 to display "You Win"
  if (score === 70) {
    document.getElementById("winMessage").style.display = "block";
  } else {
    document.getElementById("winMessage").style.display = "none";
  }
}

function playCollisionSound() {
  var collisionSound = document.getElementById("collisionSound");
  collisionSound.play();
}

function BulletAndEnemyCollision() {
  for (var i = 0; i < bullets.length; i++) {
    for (var j = 0; j < enemies.length; j++) {
      if (
        Math.abs(bullets[i].x - enemies[j].x) < 15 &&
        Math.abs(bullets[i].y - enemies[j].y < 15)
      ) {
        score += 10;
        explosion.push({ x: enemies[j].x, y: enemies[j].y });
        playCollisionSound(); // Play the collision sound
        // Set a timer to remove the explosion after 500 milliseconds
        setTimeout(function () {
          explosion.shift(); // Remove the first explosion element
          displayExplosion(); // Update the display after removing
        }, 500);
        enemies.splice(j, 1);
      }
    }
  }
}

document.onkeydown = function (a) {
  if (a.keyCode == 37) {
    // keyCode 37 is for the left key
    hero.x -= 10;
  } else if (a.keyCode == 39) {
    // keyCode 39 is for the right key
    hero.x += 10;
  } else if (a.keyCode == 38) {
    // keyCode 38 is for the up key
    hero.y -= 10;
  } else if (a.keyCode == 40) {
    // keyCode 40 is for the down key
    hero.y += 10;
  } else if (a.keyCode == 32) {
    bullets.push({ x: hero.x + 8, y: hero.y - 15 });
    displayBullets();
  }
  displayHero();
};

function gameLoop() {
  displayHero();
  moveEnemies();
  BulletAndEnemyCollision();
  displayExplosion();
  displayEnemies();
  displayBullets();
  moveBullets();
  displayScore();
}

setInterval(gameLoop, 30);
