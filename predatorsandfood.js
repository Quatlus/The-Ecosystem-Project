class EsPredatorsAndFood {

  constructor() {

    this.predator = new EsPredator();
    this.carrots = [];
    this.carrotCount = 1;

    this.wind = 0;
    this.run = 0;

    for (let i = 0; i < this.carrotCount; i++) {
      this.carrots.push(new EsCarrot(random(-300, 0), 100 + i * (height / 2 -
        50) / this.carrotCount, random(5, 20)));
    }

  }

  carrotsShow() {
    this.run = this.run + .01;
    this.wind = noise(this.run) - .5;
    var xwind = map(this.wind, -.5, .5, .42, .46);
    var that = this;

    this.carrots.forEach(function (carrot) {
      if (carrot.position.x > width / 3) {
        carrot.addForce(createVector(abs(xwind / 20), that.wind / 20));
      } else {
        carrot.addForce(createVector(abs(xwind / 15), that.wind / 50));
      }
      carrot.update();
      carrot.show();

      //that.karnickel.checkCollision(carrot);
    });
  }

  carrotsCheckEnd(bunsheeps) {
    // console.log(karnickel.name);
    this.carrots.forEach(function (carrot) {
      carrot.checkFloor(bunsheeps);
      //console.log('mitte ' + karnickel.name);
    });

  }

  checkCollision(carrot) {
    var kopf_links = this.kopf.headposition.x - this.kopf.size;
    var kopf_rechts = this.kopf.headposition.x + this.kopf.size;
    var carotte_x = carrot.position.x + carrot.size / 1;
    var kopf_oben = this.kopf.headposition.y - 1.5 * this.kopf.size;
    var kopf_unten = this.kopf.headposition.y + .5 * this.kopf.size;
    var carotte_y = carrot.position.y - carrot.size / 2;

    if (carotte_x > kopf_links && carotte_x < kopf_rechts) {
      if (carotte_y > kopf_oben && carotte_y < kopf_unten) {
        // bunshee.setFramesActive(frameCount);
        // bunshee.setHit(1);
        // bunshee.setMode(1);
        this.parent.setFramesActive(frameCount);
        this.parent.setHit(1);
        this.parent.setMode(1);

        carrot.position.x = -random(100, 200);
        this.feed(map(carrot.size, 5, 20, 5, 20));

        EsBunshee.beep(map(carrot.size, 5, 20, 40, 60), .15, 'square', .5);
      }
    }
  }

  predatorShow() {
    this.predator.checkEdges();
    this.predator.update();
    this.predator.show();
  }

  predatorCheck(karnickel) {
    this.predator.attackBody(karnickel);
  }

  predatorStart() {
    this.predator.velocity.x = 0;
    this.predator.position.x = width + 50 - random(100);
    this.predator.addForce(createVector(-11, 0));
    this.predCount = round(random(401, 1201));
  }

}
