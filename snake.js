let snake;
let scl = 40;
let food;

class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [
      createVector(this.x, this.y),
      createVector(this.x, this.y),
      createVector(this.x, this.y),
    ];
  }

  eat(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      this.tail.push(createVector(this.x, this.y));
      return true;
    }
    return false;
  }

  dir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  death() {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log("Game Over!");
        this.total = 0;
        this.tail = [];
      }
    }
  }

  update() {
    console.log("updating");
    this.tail.shift();
    this.tail.push(createVector(this.x, this.y));

    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;
  }

  show() {
    console.log("showing");
    fill(255);
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
}

function setup() {
  createCanvas(400, 400);
  frameRate(4);
  snake = new Snake();
  pickLocation();
}

function draw() {
  background(51);

  if (snake.eat(food)) {
    console.log("ate!");
    pickLocation();
  }

  snake.update();
  snake.show();
  snake.death();

  fill(255, 0, 0);
  rect(food.x, food.y, scl, scl);

  fill(255);
  text("Score: " + snake.total, 0, 10);
}

function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW && snake.yspeed != 1) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && snake.yspeed != -1) {
    snake.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW && snake.xspeed != -1) {
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW && snake.xspeed != 1) {
    snake.dir(-1, 0);
  }
}
