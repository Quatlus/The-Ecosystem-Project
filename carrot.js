class EsCarrot {

  constructor (x, y, s) {
    this.position = createVector(x, y);
    this.acceleration = createVector(random(.1,1), .1);
    this.velocity = createVector(1, random(0,.2));
    this.size = s;
  }

  show () {
    fill(bodyCarrotColor);
    noStroke();

    push();
    translate(this.position.x, this.position.y);
    var tmp = this.velocity.copy();
    var dir = tmp.y;
    dir = map(dir, -1, 1, -90, 90);
    dir = radians(dir);
    rotate(-HALF_PI+dir/2);

    triangle(0, 0, this.size, 0, this.size/2, this.size*3);
    fill(headCarrotColor);
    triangle(0, 0, this.size/3, 0, 0-this.size/6, -this.size);
    triangle(this.size/3, 0, this.size/3*2, 0, this.size/2, -this.size);
    triangle(this.size/3*2, 0, this.size/3*3, 0, this.size+this.size/6, -this.size);
    pop();
  }

  update () {
   if (this.position.x > width/3) {
      this.addForce(createVector(abs(wind/200), wind/200));
    }
    this.velocity.add(this.acceleration);
    //this.velocity.limit(2.4);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  addForce (f) {
    this.acceleration.add(f);
  }

  checkFloor () {
    if (this.position.x > width) {
      this.position.x -= width+150;
      karnickel.feed(-5);
      framesActive = frameCount;
      hit++;
      mode = 2;
    }
    if (this.position.y < -50) {
      this.velocity.y = -this.velocity.y;
    }
    if (this.position.y > height + 50) {
      this.velocity.y = -this.velocity.y;
    }
   }
}
