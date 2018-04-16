class EsBunshee {

  constructor () {

    this.karnickel;
    this.carrots = [];
    this.eye = 3;
    this.wind = 0;
    this.run = 0;
    this.framesActive = false;
    this.hit = false;
    this.mode = 1;
    this.left;
    this.right;
    this.up;
    strokeCap(PROJECT);
    this.carrotCount = 12;
    this.karnickel = new EsBody(80);
    this.karnickel.addForce(new p5.Vector(-4,-120));

    for (let i = 0; i < this.carrotCount; i++) {
      this.carrots.push(new EsCarrot(random(-300, 0), 100+i*(height/2-50)/this.carrotCount, random(5, 20)));
    }

    this.left = createVector(-5, 0);
    this.right = p5.Vector.mult(this.left, -1);
    this.up = createVector(0, -15);

    this.predator = new EsPredator();
    this.ps = new ParticleSystem(299,200);
  }

  setHit(hit) {
    this.hit = hit;
  }

  setMode(mode) {
    this.mode = mode;
  }

  setFramesActive(framesActive) {
    this.framesActive = framesActive;
  }

  display () {

    background(backgroundColor);

    this.karnickel.checkEdges();
    this.karnickel.update();
    this.karnickel.show();

    this.run =  this.run + .01;
    this.wind = noise(this.run)-.5;
    var xwind = map(this.wind, -.5, .5, .42, .46);
    var that = this;

    this.carrots.forEach (function(carrot) {

      if (carrot.position.x > width/3) {
        carrot.addForce(createVector(abs(xwind/20), that.wind/20));
      } else {
        carrot.addForce(createVector(abs(xwind/15), that.wind/50));
      }

      carrot.update();
      carrot.show();
      carrot.checkFloor(that.karnickel);
      that.karnickel.checkCollision(carrot);

    });

    if (this.hit > 0) {
      if (this.mode == 1) {
        this.karnickel.kopf.eye = 10;
      } else {
        this.karnickel.kopf.eye  = 15;
      }
      if (frameCount - this.framesActive > 30) {
        this.hit = 0;
        this.karnickel.kopf.eye = 1;
      }
    }

    if (keyIsDown(37)) {
      this.karnickel.addForce(this.left);
    }
    if (keyIsDown(39)) {
      this.karnickel.addForce(this.right);
    }
    if (keyIsDown(32) || keyIsDown(38)) {
      this.karnickel.addForce(this.up);
    }

    this.predator.checkEdges();
    this.predator.update();
    this.predator.show();
    this.predator.attackBody(this.karnickel);



    textSize(10);
    fill(0,120);
    text('control: left arrow & up arrow | space bar & right arrow', 10, 30);
    text('predator: hit p', 10, 50);
    text(nf(frameCount,8,0) + ' // ' + nf(round(millis()/1000),8,0) + ' // ' + nf(round(this.karnickel.size),10,0), 10, 70);

  }

  predatorStart () {
    this.predator.velocity.x = 0;
    this.predator.position.x = width + 50;
    this.predator.addForce(createVector(-15,0));
    this.predCount = round(random(401,1201));
  }

  static beep (f, t, w, a) {
    var wave;
    wave = new p5.Oscillator();
    wave.setType(w);
    wave.start();
    wave.amp(a/4);
    wave.freq(map(f, 50,100,50,600));
    wave.stop(t);
  }

}
