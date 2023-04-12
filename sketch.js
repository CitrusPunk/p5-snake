const amountFields = 32;
let size,
  meal,
  snake,
  dead,
  pause,
  widthWindow,
  heightWindow,
  mealColor,
  snakeColor,
  backgroundColor,
  cols,
  rows,
  offsetX,
  offsetY;

let main = document.getElementById("hud");

function setup() {
  mealColor = color("#4084BF");
  snakeColor = color("#BF4084");
  backgroundColor = color("#EEF1EF");
  pause = false;
  widthWindow = main.offsetWidth;
  heightWindow = main.offsetHeight;

  cols = floor(widthWindow / size);
  rows = floor(heightWindow / size);
  offsetX = (widthWindow % size) / 2;
  offsetY = (heightWindow % size) / 2;
  // setup canvas and drawing modes
  createCanvas(widthWindow, heightWindow);
  ellipseMode(CENTER);
  noStroke();

  init();

  updateScore(snake.getScore());
}

function init() {
  // initialize variables and objects
  dead = false;
  size = max(widthWindow, heightWindow) / amountFields; // 'amountFields' fields fitting the windows larger side
  meal = new Meal(mealColor, size);
  snake = new Snake(snakeColor, 50, size, amountFields);
  collisionManager = new CollisionManager(meal, snake, {});
}

function draw() {
  if (!pause) {
    background(backgroundColor);

    drawGrid();
    meal.draw();
    snake.draw();

    update();
  }
}

function update() {
  if (frameCount % 5 === 0) {
    snake.update();

    ate = collisionManager.didSnakeHitMeal();
    dead = collisionManager.didSnakeHitSnake();

    if (ate) {
      snake.partCount++;
      meal.relocate(snake.partList);
      updateScore(snake.getScore());
    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      snake.setDirection("LEFT");
      break;
    case RIGHT_ARROW:
      snake.setDirection("RIGHT");
      break;
    case UP_ARROW:
      snake.setDirection("UP");
      break;
    case DOWN_ARROW:
      snake.setDirection("DOWN");
      break;
    case LEFT_ARROW:
      snake.setDirection("LEFT");
      break;
    case 80: // p
      console.log(snake.pos);
      console.log(size);
      pause = !pause;
      break;
    case 82: // r
      console.log("restart");
      init();
      break;
  }
}

function drawGrid() {
  rectMode(CORNER);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      noFill();
      stroke(0, 0, 0);
      rect(offsetX + x * size, offsetY + y * size, size, size);
    }
  }
}

function updateScore(score) {
  let scores = "0000";
  scores += score;
  scores = scores.substring(scores.length - 4);
  document.getElementById("scores").innerHTML = scores;
}
