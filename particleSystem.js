class ParticleSystem {

  constructor(x, y, karnickel) {

    this.name = "ParticleSystem";
    this.Child = Particle;
    this.Child.prototype.parent = this;

    this.x_ = x;
    this.y_ = y;
    this.emitter = createVector(x, y);
    this.plist = [];
    this.karnickel = karnickel;
    this.originAcceleration = createVector(0, 0);
    this.originVelocity = createVector(0, 0);
  }

  addParticle() {


    if (this.karnickel.parent.hit > 0 && this.karnickel.parent.mode == 1) {
      this.plist.push(new Particle(this.x_, this.y_));
    }
  }

  run() {

    this.plist = this.plist.filter(p => !p.isDeath());
    for (let particle of this.plist) {
      particle.run(this.karnickel);
    }

    this.addParticle();
    // this.addParticle();
    // this.addParticle();
  }
}
