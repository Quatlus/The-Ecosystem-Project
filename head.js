class EsHead {

  constructor(s, x, y, this_) {
    this.size = s;
    this.waverand = random(0, 5);
    this.headposition = createVector(x, y);
    this.headacceleration = createVector(0, 0);
    this.eyesposition = this.headposition.copy();
    this.eye = 1;

    this.parent = this_;

    // console.log(this.parent.parent.name);
    //  console.log(this.parent.parent.eye);

  }

  show(x, y, vel) {
    var velocity = vel.copy();
    var headSize = this.size;
    this.headposition.x = x;
    this.headposition.y = y;
    var xwave = cos(radians(frameCount * 2 % 360) + this.waverand) * this.parent.size / 3;
    var ywave = sin(radians(frameCount * 8 % 360) + this.waverand) * this.parent.size / 5 * .6;
    this.headacceleration.add(createVector(xwave * 1.2, ywave + this.size / 2));
    this.headposition.add(this.headacceleration);
    this.headposition.sub(velocity.mult(2)); // contra body

    fill(headColor);
    ellipse(this.headposition.x, this.headposition.y - headSize / 2, headSize,
      headSize);

    for (let i = 0; i < 360; i += 45) {
      let ix = cos(radians(i)) * this.size / 1.4;
      let iy = sin(radians(i)) * this.size / 1.4;
      ellipse(this.headposition.x + ix, this.headposition.y + iy - this.size /
        2, 10, 10);
    }

    this.headacceleration.mult(0);
    this.showEyes();
    this.eyesposition = this.headposition.copy();
  }

  showEyes() {
    fill(eyeColor);
    stroke(bodyCarrotColor);
    strokeWeight(3);
    let mod = -this.size / 2.5;
    let mody = -this.size / 1.25;
    //console.log(this.parent.name, this.eye);
    if (this.eye == 15) {
      strokeWeight(2);
      line(this.eyesposition.x + mod, this.eyesposition.y + 2 + mody, this.eyesposition
        .x - 5 + mod, this.eyesposition.y + 7 + mody);
      line(this.eyesposition.x + mod, this.eyesposition.y + 7 + mody, this.eyesposition
        .x - 5 + mod, this.eyesposition.y + 2 + mody);
      line(this.eyesposition.x - mod, this.eyesposition.y + 2 + mody, this.eyesposition
        .x + 5 - mod, this.eyesposition.y + 7 + mody);
      line(this.eyesposition.x - mod, this.eyesposition.y + 7 + mody, this.eyesposition
        .x + 5 - mod, this.eyesposition.y + 2 + mody);
    } else if (this.eye == 10) {
      strokeWeight(2);
      fill("#000000");
      stroke(200);
      ellipse(this.eyesposition.x + mod * 1.3, this.eyesposition.y + mody * .5,
        this.eye - 7, this.eye - 7);
      ellipse(this.eyesposition.x - mod * 1.3, this.eyesposition.y + mody * .5,
        this.eye - 7, this.eye - 7);
      fill("#ff6666");
      stroke("#ff6666");
      noStroke();
      arc(this.eyesposition.x, this.eyesposition.y - this.size / 5, 5, 5, 0,
        PI);
    } else {
      stroke(200);
      ellipse(this.eyesposition.x + mod * 1.3, this.eyesposition.y + mody * .6,
        this.eye, this.eye);
      ellipse(this.eyesposition.x - mod * 1.3, this.eyesposition.y + mody * .6,
        this.eye, this.eye);
    }

  }

}
