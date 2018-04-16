class Particle {

  constructor(x,y) {
    this.origin = createVector(x,y);
    this.location = createVector(0,0);
    this.position = createVector(0,0);
    this.acceleration = createVector(0,0);
    let distribution = 1;
    this.velocity = createVector(random(-distribution*2,distribution*2),random(-distribution,distribution));
    this.lifespan = 128;
    this.orglifespan = this.lifespan;
    this.mass = random(10,10);
  }

  run() {
    this.update();
    this.show();
  }

  applyForce(f) {
    f.div(this.mass);
    this.acceleration.add(f);
  }

  applyOriginForce(f) {
    this.originAcceleration.add(f);
  }

  update () {

    let gravity = -.1;
    gravity = createVector(0, this.mass * gravity);
    //this.applyForce(gravity);

    var friction =  .5;
    var tmpVel = this.velocity.copy();
    tmpVel = tmpVel.normalize();
    tmpVel.mult(-1*friction);
    friction = tmpVel;
    this.applyForce(friction);

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);

    this.lifespan -= 2;

    this.acceleration.mult(0);
  }

  show() {
    noStroke();
    var o = map(this.lifespan, this.orglifespan, 0, 0, PI);
    var t = sin(o)*128;
    fill(255,102,102, this.lifespan);//255, 102, 102   abs(cos(o))*255
    //fill(0,0,0, this.lifespan/3);
    push();

    if (this.lifespan > 123)  {
      //this.position = createVector(mouseX,mouseY);
      //console.log(bunshee.karnickel.kopf);
      this.position = bunshee.karnickel.kopf.eyesposition.copy();
      this.position.y -= 30;
      this.location = this.position;
    } else  {
      this.position = this.location;
    }
    //this.location = createVector(120,120);

    translate(this.position.x,this.position.y);

    rotate(this.velocity.heading()-HALF_PI);

    var w = map(this.lifespan, this.orglifespan, 0, 10, 0);
    //var antisize = map(this.mass,10, 100, 1, 20);

    let x_ = 0;
    let y_ = 0;
    let w_ = w;//*antisize;
    let h_ = w;//*antisize*2;
    rectMode(CENTER);
    ellipse(0, 0, w_, w_);
    pop();
  }

  isDeath() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

}
