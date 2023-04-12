class Meal {
  constructor(c = color(30, 110, 250), s = 10) {
    this.color = c;
    this.size = s;
    this.radius = s/2;

    this.relocate();
  }

  draw() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  relocate(snakeParts = []) {
    let hitSnake = false;
    let x,y;
    do {
      x = Math.floor(Math.random() * (widthWindow / this.size));
      y = Math.floor(Math.random() * (heightWindow / this.size));

      console.log(this);
      console.log(snakeParts);
      for(let  i = 0; i < snakeParts.length; i++){
        if(collideCircleCircle(x,y,this.radius, snakeParts[i].x,snakeParts[i].y, this.radius)){
          hitSnake= true;
          console.log('got a collision with snake part');
        }
      }
    } while (hitSnake);
    this.pos = createVector(this.radius + this.size * x, this.radius + this.size * y);
  }
}
