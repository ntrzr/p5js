var ash = [];
var wind = {
  x: 0,
  y: 0,
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  camera(0, -500, 800, 0, 0, 0, 0, 1, 0);

  for (var i = 0; i < 500; i++) {
    ash.push(new CParticle());
  }
}

function draw() {
  background(31, 39, 51);
  ambientMaterial(52, 52, 53);
  ambientLight(800);

  directionalLight(255, 255, 255, -1, -1, 0.5);

  wind.x = noise(frameCount * 0.01);
  wind.y = noise(frameCount * 0.01 + 100);

  rotateZ(map(frameCount, 0, 600, 0, TWO_PI));

  for (var particle of ash) {
    particle.Update();
    particle.Render();
  }
}

class CParticle {
  constructor() {
    this.x = random(-width / 2, width / 2);
    this.y = random(-height, height);
    this.z = random(-500, 500);
    this.rotationX = random(TWO_PI);
    this.rotationY = random(TWO_PI);
    this.rotationSpeedX = random(-0.02, 0.02);
    this.rotationSpeedY = random(-0.02, 0.02);
    this.size = random(5, 15);
    this.speed = random(1, 5);
    this.shapeAngles = random(4, 32);
  }

  Update() {
    this.z += this.speed;
    this.x += wind.x * 0.5;
    this.y += wind.y * 0.5;
    this.rotationX += this.rotationSpeedX;
    this.rotationY += this.rotationSpeedY;

    if (this.z > 800) {
      this.z = -500;
      this.x = random(-width / 2, width / 2);
      this.y = random(-height / 2, height / 2);
    }
  }

  Render() {
    push();

    translate(this.x, this.y, this.z);
    rotateX(this.rotationX);
    rotateY(this.rotationY);
    noStroke();
    fill("white");

    beginShape();
    for (var i = 0; i < 8; i++) {
      var angle = (TWO_PI * i) / this.shapeAngles;
      var radius = this.size / 3;
      vertex(radius * cos(angle), radius * sin(angle), 0);
    }
    endShape(CLOSE);

    pop();
  }
}
