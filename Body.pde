class Body {

  PVector acceleration;
  PVector velocity;
  PVector position;
  PVector slowPosition;
  float size;
  float mass;
  Head kopf;


  Body (float s_) {

    //  size = constrain(size,150,300);
    size = s_;

    position = new PVector(random(size, width-size), height-size/2);
    acceleration = new PVector(-5, 0);
    velocity = new PVector(0, 0);
    slowPosition = new PVector(0, 0);
    kopf = new Head(size/4, position.x, position.y-size/2);
    mass = size/20;
  }

  void feed (float cal_) {
    //size = size + cal_;
    size = size + cal_;
    if (size < 150) {
      size = 150;
    }
    if (size > 350) {
      size = 350;
    }
  }

  void addForce (PVector f) {
    f = PVector.div(f, mass);
    acceleration.add(f);
  }

  void update () {
    PVector gravity = new PVector(0, .3*mass);
    addForce(gravity);

    PVector friction = velocity.get();
    float c = 1;
    friction.normalize();
    friction.mult(-1);
    friction.mult(c);
    if (position.y > height-1) {
      addForce(friction);
    }

    velocity.add(acceleration);
    velocity.limit(15);
    position.add(velocity);
    acceleration.mult(0);
  }

  void show () {
    //ellipseMode(RADIUS);   
    //ellipse(position.x, position.y,50,50);
    stroke(brushColor);
    fill(bodyColor);
    strokeWeight(0);
    noStroke();

    slowPosition = position.get();
    PVector localSpeed = velocity.get();
   // localSpeed.normalize();
    slowPosition.sub(localSpeed.mult(1));
    fill(130);
    for (int i = 0; i < 360; i+=12) {
      float ix = cos(radians(i))*size/2.135;
      float iy = sin(radians(i))*size/2.135;
      ellipse(slowPosition.x+ix, slowPosition.y-50+iy, 53, 53);
    }
    
    ellipse(position.x, position.y-50, size, size);

    fill(200);

    arc(position.x, position.y, size/3, size/3, 0, TWO_PI, CLOSE);

    kopf.show(position.x, position.y-size/2, velocity);
  }
  void checkEdges() {
    if (position.x+size/2 < 0) {
      position.x = width+size/2;
      //velocity.x *= -1;
    } else if (position.x - size/2 > width) {
      position.x = -size/2;
      // velocity.x *= -1;
    }

    if (position.y > height) {
      position.y = height;
      velocity.y *= -.51;
    }
  }

  void checkCollision(Carrot carrot) {

    float kopf_links = kopf.headposition.x-kopf.size/2;
    float kopf_rechts = kopf.headposition.x+kopf.size/2;
    float carotte_x = carrot.position.x+carrot.size/1;

    float kopf_oben = kopf.headposition.y-kopf.size;
    float kopf_unten = kopf.headposition.y;
    float carotte_y = carrot.position.y-carrot.size/2;
    stroke(0, 255, 0, 0);
    fill(255, 0);
    ellipse(carotte_x, carotte_y, 5, 5); 
    stroke(0, 255, 0, 0);
    ellipse(kopf_links, kopf.headposition.y-kopf.size/2, 5, 5);
    ellipse(kopf_rechts, kopf.headposition.y-kopf.size/2, 5, 5);
    ellipse(kopf.headposition.x, kopf_oben, 5, 5);
    ellipse(kopf.headposition.x, kopf_unten, 5, 5);

    if (carotte_x > kopf_links && carotte_x < kopf_rechts) {
      //println ("hit x");
      if (carotte_y > kopf_oben && carotte_y < kopf_unten) {

        //headColor = color(#ffffff);
        framesActive = frameCount;
        hit++; 
        mode = 1;

        carrot.position.x = -random(100, 200);
        //carrot.velocity.mult(0);
        karnickel.feed(map(carrot.size, 5, 20, 5, 20));
      }
    }
  }

  //
}
