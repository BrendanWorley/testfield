//----setting up the canvas--------------------

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//-----defining the 'score' variable----------------
const scoreDisplay = document.querySelector('.score');
let existingBalls = 0;

//-----setting up color randoming functions----------
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

//------setting up the global class named 'Shape'-----
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

//------setting up the class extending from the 'Shape' class to generate the balls----
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size, exists = true) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = exists;
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
      if (!(this === ball) && ball.exists === true) {
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

//------setting up the class for 'EvilCircle' extending from the same 'Shape' class-----
class EvilCircle extends Shape {
  constructor(x, y, velX, velY) {
    super(x, y, 5, 5);
    this.color = '#fffefc';
    this.size = 10;

    //----this code provides for EvilCircle guidance--------------
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a':
          this.x -= this.velX;
          break;
        case 'd':
          this.x += this.velX;
          break;
        case 'w':
          this.y -= this.velY;
          break;
        case 's':
          this.y += this.velY;
          break;  
      }
    });
  }

  //-----this code provides for actual drawing the EvilCircle-----------
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  //-----this code provides for keeping the EvilCirlce within the canvas-----
  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x = (width - this.size);
    }

    if ((this.x - this.size) <= 0) {
      this.x = (this.size);
    }

    if ((this.y + this.size) >= height) {
      this.y = (height - this.size);
    }

    if ((this.y - this.size) <= 0) {
      this.y = (this.size)
    }
  }

  //-----this code is the actual 'eating' the balls which get across the EvilCircle-----
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists === true) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
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

//-----creating the EvilCircle and placing it at coordinates x = 70 y = 80------------------------------------
const theLangolier = new EvilCircle (70, 80, 20, 20);

//------painting the black canvas and lanching all the balls and theLangolier at once, i.e. drawing them and moving them--------

function loop() {
  //-----drawing the black canvas, the field for our game------
  ctx.fillStyle = `rgba(0, 0, 0, 0.25)`;
  ctx.fillRect(0, 0, width, height);

  

  //----balls' behaviour-----------------------------------------
  existingBalls = 0;
  for (const ball of balls) {
    if (ball.exists === true) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
      existingBalls ++;
    }
    scoreDisplay.textContent = existingBalls;
     
    
  }

  

  requestAnimationFrame(loop);
  //-----manipulating the EvilCirle--------------------------------
  theLangolier.checkBounds();
  theLangolier.draw();
  theLangolier.collisionDetect();
}

//-----------here we need to push the loop() function at least once and then it'll pick it up by itself----
loop();
console.log(theLangolier.x, theLangolier.y);

