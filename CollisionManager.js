class CollisionManager {
  constructor(meal, snake, level) {
    this.snake = snake;
    this.meal = meal;
    this.level = level;
  }

  didSnakeHitMeal() {
    return collideCircleCircle(
      this.snake.pos.x,
      this.snake.pos.y,
      this.snake.radius,
      this.meal.pos.x,
      this.meal.pos.y,
      this.meal.radius
    );
  }

  didSnakeHitSnake() {
    let ret = false;
    for (let i = 0; i < this.snake.partList.length - 1; i++) {
      if (collideCircleCircle(
        this.snake.partList[this.snake.partList.length - 1].x,
        this.snake.partList[this.snake.partList.length - 1].y,
        this.snake.radius,
        this.snake.partList[i].x,
        this.snake.partList[i].y,
        this.snake.radius
      )) {
        ret = true;
        console.log("eat it self");
      }
    }
    return ret;
  }

  didSnakeHitLevel() {
    // TODO: Implement level collisions
  }
}
