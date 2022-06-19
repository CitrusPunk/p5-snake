const amountFieldsByWidth = 25,
  widthWindow = 1200,
  heightWindow = 960;
let size, meal, snake, dead;

function setup() {
  // setup canvas and drawing modes
  createCanvas(widthWindow, heightWindow);
  ellipseMode(CENTER);
  noStroke();

  init();

  updateScore(snake.getScore());
}

function init(){
    // initialize variables and objects
    dead = false;
    size = widthWindow / amountFieldsByWidth; // 'amountFieldsByWidth' fields fitting the windows widthWindow
    meal = new Meal(30, 110, 250, size);
    snake = new Snake(230, 110, 20, 5, size);
    collisionManager = new CollisionManager(meal, snake, {});
}

function draw() {
  if (true) {
    background(220);

    // drawGrid();
    meal.draw();
    snake.draw();

    update();
  }
}

function update() {
  if (frameCount % 3 === 0) {
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
  if (keyCode === LEFT_ARROW) {
    snake.setDirection("LEFT");
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDirection("RIGHT");
  } else if (keyCode === UP_ARROW) {
    snake.setDirection("UP");
  } else if (keyCode === DOWN_ARROW) {
    snake.setDirection("DOWN");
  }

  if (keyCode === 80) {
    // ASCII code for 'p'
    console.log(snake.pos);
    console.log(size);
  }
  if (keyCode === 82) {
    // ASCII code for 'r'
    console.log('restart');
    init();
  }
}

function drawGrid() {
  rectMode(CORNER);
  const cols = widthWindow / size;
  const rows = heightWindow / size;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      noFill();
      stroke(0, 0, 0);
      rect(x * size, y * size, size, size);
    }
  }
}

function updateScore(score) {
  let points = "0000";
  points += score;
  points = points.substring(points.length - 4);
  document.getElementById("points").innerHTML = points;
}
