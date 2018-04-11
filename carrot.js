class EsCarrot {

  constructor (x, y, s) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0, 0);
    this.size = s;

    this.addForce(createVector(.4,0));
  }

  show () {
    fill(bodyCarrotColor);
    noStroke();

    push();
    translate(this.position.x, this.position.y);
    var tmp = this.velocity.copy();
    var dir = atan(tmp.y/tmp.x);
    //dir = map(dir, -1, 1, -90, 90);
    //dir = radians(dir);
    //console.log(dir);
    rotate(-HALF_PI+dir);

    triangle(0, 0, this.size, 0, this.size/2, this.size*3);
    fill(headCarrotColor);
    triangle(0, 0, this.size/3, 0, 0-this.size/6, -this.size);
    triangle(this.size/3, 0, this.size/3*2, 0, this.size/2, -this.size);
    triangle(this.size/3*2, 0, this.size/3*3, 0, this.size+this.size/6, -this.size);
    pop();
  }

  update () {

    var friction = this.velocity.copy();
		var c =  .023;
		friction.normalize();
		friction.mult(-1);
		friction.mult(c);
    this.addForce(friction);
    var xwind = map(wind, -.5, .5, .42, .46);
    //console.log(xwind);
   if (this.position.x > width/3) {
    this.addForce(createVector(abs(xwind/20), wind/20));
  } else {
    this.addForce(createVector(abs(xwind/15), wind/50));


  }
    this.velocity.limit(8);
    this.velocity.add(this.acceleration);

    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  addForce (f) {
    var force = p5.Vector.mult(f, this.size);
    this.acceleration.add(force);
  }

  checkFloor () {
    if (this.position.x > width) {
      this.position.x -= width+150;
      this.velocity.x = .2/this.size;
      karnickel.feed(-5);
      framesActive = frameCount;
      hit++;
      mode = 2;
      beep(map(this.size, 5, 20, 48, 90),.1,'triangle', .1);
    }
    if (this.position.y < -50) {
      this.position.y = height + 50;
      //this.velocity.y = -this.velocity.y;
    }
    if (this.position.y > height + 50) {
      this.position.y = -50;
      //this.velocity.y = -this.velocity.y;
    }
   }
}
