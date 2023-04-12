class Snake {
  constructor(
    c = color(230, (g = 50), (b = 75)),
    startCount = 3,
    size = 10,
    amountFields = 32
  ) {
    this.color = c;
    this.size = size;
    this.radius = size / 2;
    this.amountFields = amountFields;

    // start heading to the right more or less in the middle
    this.pos = createVector(this.radius, this.size * (this.amountFields / 2));
    this.setDirection("RIGHT");

    // initialize first parts of snake and the amountFieldsByWidth started with
    this.partList = [];
    this.startCount = startCount;
    this.partCount = this.startCount;
    for (let i = 0; i < this.startCount; i++) {
      this.update();
    }
  }

  draw() {
    fill(this.color);
    this.partList.forEach((part) =>
      ellipse(part.x, part.y, this.size - 2, this.size - 2)
    );
  }

  update() {
    this.checkBorders();

    this.pos.add(this.direction.copy().mult(this.size));
    this.partList.push(this.pos.copy());
    if (this.partList.length > this.partCount) this.partList.shift();
  }

  setDirection(direction) {
    if (direction === "LEFT" && this.lastDirection !== "RIGHT") {
      this.direction = createVector(-1, 0);
    }
    if (direction === "RIGHT" && this.lastDirection !== "LEFT") {
      this.direction = createVector(1, 0);
    }
    if (direction === "UP" && this.lastDirection !== "RIGHT") {
      this.direction = createVector(0, -1);
    }
    if (direction === "DOWN" && this.lastDirection !== "RIGHT") {
      this.direction = createVector(0, 1);
    }
  }

  // TODO: calculate borders depending on which side is higher and apply maximum on right and bottom
  checkBorders() {
    if (this.pos.x > widthWindow + this.radius) {
      this.pos.x = 0 + this.radius;
    } else if (this.pos.x < -this.radius) {
      if (width > height) {
        this.pos.x = floor(width / this.size) * this.size - this.radius;
      } else {
        this.pos.x = (amountFields + 1) * this.size - this.radius;
      }
    }

    if (this.pos.y > heightWindow + this.radius) {
      this.pos.y = 0 + this.radius;
    } else if (this.pos.y <= -this.radius) {
      if (width < height) {
        this.pos.y = floor(height / this.size) * this.size - this.radius;
      } else {
        this.pos.y = (amountFields + 1) * this.size - this.radius;
      }
    }
  }

  addPart() {
    this.partCount++;
  }

  getScore() {
    return snake.partCount - snake.startCount;
  }
}
