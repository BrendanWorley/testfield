//----setting up the canvas--------------------

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//-----setting up color randoming functions----------
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

//------setting up the global class generate the balls----
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

    //----drawing the ball----------------------
  draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
  }
    //-----actually making the ball move through the update of its position-----
  update() {
      if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
      }

      if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
      }

      if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
      }

      if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY)
      }

      this.x += this.velX;
      this.y += this.velY;
  }

    //----adding the 'collision detection' feature to the balls behavior----------
  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
  
}


//--------creating test ball (not needed in normal operation-------
// const testBall = new Ball(50, 100, 4, 4, 'blue', 10);
// testBall.draw();
//-----------------------------------------------------------------

//--------creating the storage for all the balls to be created------
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width away from the
    // edge of the canvas, to avoid drawing errors
  random(0 + size, width - size),
  random(0 + size, height - size), 
  random(-7, 7),
  random(-7, 7),
  randomRGB(),
  size
  );
      //----and adding the newly generated ball to the array above----
  balls.push(ball);

}

//------painting the black canvas and lanching all the balls at once, i.e. drawing them and moving them--------

function loop() {
  ctx.fillStyle = `rgba(0, 0, 0, 0.25)`;
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);

}

//-----------here we need to push the loop() function at least once and then it'll pick it up by itself----
loop();


