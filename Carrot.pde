class Carrot {

  PVector acceleration;
  PVector velocity;
  PVector position;
  float size;

  Carrot (float x_, float y_, float s_) {
    position = new PVector(x_, y_);
    //println(position);
    acceleration = new PVector(random(.1,.5), .1);
    velocity = new PVector(1, 0);
    size = s_;
  }

  void show () {
    fill(bodyCarrotColor);
    noStroke();
    pushMatrix();
    translate(position.x, position.y);

    PVector tmp = velocity.get();
    float dir = tmp.y; 
    dir = map(dir, -1, 1, -90, 90);
    dir = radians(dir);
   // println( dir, position.x);

    rotate(-HALF_PI+dir/2);

    triangle(0, 0, size, 0, size/2, size*3);
    fill(headCarrotColor);
    triangle(0, 0, size/3, 0, 0-size/6, -size);
    triangle(size/3, 0, size/3*2, 0, size/2, -size);
    triangle(size/3*2, 0, size/3*3, 0, size+size/6, -size);
    popMatrix();
  }

  void update () {
    PVector gravity = new PVector(.001, 0);
    //addForce(gravity);
    if (position.x > width/2) {
      addForce(new PVector(abs(wind/50), wind/100));
    }
    //addForce(new PVector(0, random(-.01, .01)));
    velocity.add(acceleration);
    velocity.limit(2.4);
    position.add(velocity);
    acceleration.mult(0);
  }

  void addForce (PVector f) {
    acceleration.add(f);
  }

  void checkFloor () {
    if (position.x > width) {
      position.x -= width+150;
      karnickel.feed(-5);
      
      framesActive = frameCount;
      hit++; 
      mode = 2;
      //velocity.set(1, 0);
      //velocity.x=1;
      //println(velocity.mag());
    }

    if (position.y < -50) {
      velocity.y = -velocity.y;
    }

    if (position.y > height + 50) {
      velocity.y = -velocity.y;
    }
  }
}
