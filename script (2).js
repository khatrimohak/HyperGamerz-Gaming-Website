const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0;
let gameOver = false;
ctx.font = "50px Impact";
let timeToNextRaven = 0;
let ravenInterval = 560;
let lastTime = 0;
let horizontal_speed = 1.5;
let vertical_speed = 1.5;
let ravens = [];

class Raven {
  constructor() {
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.width = this.spriteWidth / 2.3;
    this.height = this.spriteHeight / 2.3;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = horizontal_speed;
    this.directionY = vertical_speed;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = "raven.png";
    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = 56;
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    this.color =
      "rgb(" +
      this.randomColors[0] +
      "," +
      this.randomColors[1] +
      "," +
      this.randomColors[2] +
      ")";
  }

  update(deltatime) {
    if (this.y < 0 || this.y > canvas.height - this.height) {
      this.directionY = this.directionY * -1;
    }
    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.X < 0 - this.width) {
      this.markedForDeletion = true;
    }
    this.timeSinceFlap += deltatime;
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0;
      else this.frame++;
      this.timeSinceFlap = 0;
      particles.push(new Particle(this.x, this.y, this.width, this.color));
    }
    // console.log(deltatime);
    if (this.x < 0 - this.width) gameOver = true;
  }

  draw() {
    collisionCtx.fillStyle = this.color;
    collisionCtx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

let explosions = [];
class Explosion {
  constructor(x, y, size) {
    this.image = new Image();
    this.image.src = "boom.png";
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.size = size;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.sound = new Audio();
    this.sound.src = "Ice attack 2.wav";
    this.timeSinceLastFrame = 0;
    this.frameInterval = 200;
    this.markedForDeletion = false;
  }
  update(deltatime) {
    if (this.frame === 0) this.sound.play();
    this.timeSinceLastFrame += deltatime;
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++;
      this.timeSinceLastFrame = 0;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.size,  //size stretch of explot.
      this.size
    );
  }
}

let particles = [];
class Particle {
  constructor(x, y, size, color) {
    this.size = size;
    this.x = x + this.size / 2;
    this.y = y + this.size / 3;
    this.radius = (Math.random() * this.size) / 10;
    this.maxRadius = Math.random() * 20 + 28;
    this.speedX = Math.random() * 1 + 0.5;
    this.color = color;
  }
  update() {
    this.x += this.speedX;
    this.radius += 0.3;
    if (this.radius > this.maxRadius - 15) this.markedForDeletion = true;
  }
  draw() {
    ctx.globalAlpha = 1 - this.radius / this.maxRadius;
    ctx.beginPath();
    ctx.fillstyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 50, 75);
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 52, 77);
}

function drawGameOver() {
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.fillText(
    "GAME OVER, your score is " + score,
    canvas.width / 2,
    canvas.height / 2
  );

  ctx.fillStyle = "#ff0000";
  ctx.fillText(
    "GAME OVER, your score is " + score,
    canvas.width / 2 + 2.5,
    canvas.height / 2 + 2.5
  );
}

window.addEventListener("click", function (e) {
  const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
  // console.log(detectPixelColor);
  const pc = detectPixelColor.data;
  ravens.forEach((object) => {
    if (
      object.randomColors[0] === pc[0] &&
      object.randomColors[1] === pc[1] &&
      object.randomColors[2] === pc[2]
    ) {
      object.markedForDeletion = true;
      score++;
      if (score > 10) {
        horizontal_speed = 2.6;
        vertical_speed = 2.6;
      } else if (score > 25) {
        horizontal_speed = 3.2;
        vertical_speed = 2.8;
      } else if (score > 50) {
        horizontal_speed = 3.8;
        vertical_speed = 3.4;
      } else if (score > 75) {
        horizontal_speed = 4.2;
        vertical_speed = 3.8;
      } else if (score > 100) {
        horizontal_speed = 4.6;
        vertical_speed = 4.2;
      } else if (score > 110) {
        horizontal_speed = 5.2;
        vertical_speed = 4.6;
      } else if (score > 125) {
        horizontal_speed = 5.8;
        vertical_speed = 5.2;
      } else if (score > 150) {
        horizontal_speed = 6.2;
        vertical_speed = 5.6;
      } else if (score > 175) {
        horizontal_speed = 6.8;
        vertical_speed = 6.3;
      } else if (score > 200) {
        horizontal_speed = 8;
        vertical_speed = 7;
      }
      explosions.push(new Explosion(object.x, object.y, object.width));
    }
  });
});

const raven = new Raven();
function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
  let deltatime = timestamp - lastTime;
  //console.log(deltatime);
  //NOTE: value of deltatime depends on machine, slower machine will lead to longer deltatime
  lastTime = timestamp;
  timeToNextRaven += deltatime; // it starts with value = 0 & starts at around 16 milliseconds (on my laptop)
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
    //console.log(ravens);
  }
  drawScore();
  [...particles, ...ravens, ...explosions].forEach((object) =>
    object.update(deltatime)
  );
  [...particles, ...ravens, ...explosions].forEach((object) => object.draw());
  particles = particles.filter((object) => !object.markedForDeletion);
  ravens = ravens.filter((object) => !object.markedForDeletion);
  explosions = explosions.filter((object) => !object.markedForDeletion);
  if (gameOver != true) requestAnimationFrame(animate);
  else drawGameOver();
}
animate(0);
