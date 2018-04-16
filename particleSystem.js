class ParticleSystem {

  constructor(x,y) {
    this.x_ = x;
    this.y_ = y;
    this.emitter = createVector(x,y);
    this.plist = [];

    this.originAcceleration = createVector(0,0);
    this.originVelocity = createVector(0,0);
  }

  addParticle() {
    if (bunshee.hit > 0 && bunshee.mode == 1) {
        this.plist.push(new Particle(this.x_, this.y_));
    }

  }

  run() {
    var noiserunner_ = frameCount/100; // Wind 1/2
    var noise_ = noise(noiserunner_)-.5;
    noise_ *= 10;

    for (var i = this.plist.length-1; i >= 0; i--) {

      //this.plist[i].applyForce(createVector(noise_,0)); // Wind 2/2

      // var diffMouseParticleOrigin = p5.Vector.sub(this.plist[i].origin,createVector(mouseX,mouseY));
      // diffMouseParticleOrigin.mult(-1 * .001);
      //
      // this.originAcceleration.add(diffMouseParticleOrigin);
      //

      this.plist[i].run();
      if (this.plist[i].isDeath()) this.plist.splice(i, 1);

    }
    this.addParticle();
    this.addParticle();
    this.addParticle();
  }
}
