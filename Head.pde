class Head {

  PVector headposition;
  PVector headacceleration;
  PVector eyesposition;
  float size;


  Head (float s_, float x_, float y_) {
    size = s_;
    headposition = new PVector(x_, y_);
    headacceleration = new PVector(0, 0);
    eyesposition = headposition.get();
    eye = 3;
    print(size);
  }

  void show (float x_, float y_, PVector vel_) {  
    PVector velNorm = vel_.get();
    PVector velNorm2 = velNorm.get();
    velNorm2.normalize();
    float z_ = velNorm.mag();
    float headSize = size;// + z_*2;
    headposition.x = x_;
    headposition.y = y_;

    float xwave = cos(radians(frameCount*1%360))*size/2;
    float ywave = sin(radians(frameCount*4%360))*size/3;
    headacceleration.add(new PVector(xwave, ywave+size*1.2));
    headposition.add(headacceleration);
    headposition.sub(velNorm.mult(3));

    stroke(50);
    fill(50);
    strokeWeight(2);
    ellipse(headposition.x, headposition.y-headSize/2, headSize, headSize);

    for (int i = 0; i < 360; i+=45) {
      float ix = cos(radians(i))*size/2.3;
      float iy = sin(radians(i))*size/2.3;
      ellipse(headposition.x+ix, headposition.y+iy-size/2, 13, 13);
    }
    headacceleration.mult(0);
    showEyes();
    eyesposition = headposition.get();
  }

  void showEyes () {
    fill(eyeColor);
    stroke(255);
    strokeWeight(3);
    float mod = -size/5;
    float mody = -size/2.5;
    if (eye == 15) {
      strokeWeight(2);
      line(eyesposition.x+mod, eyesposition.y-5+mody, eyesposition.x-5+mod, eyesposition.y-0+mody);
      line(eyesposition.x+mod, eyesposition.y-0+mody, eyesposition.x-5+mod, eyesposition.y-5+mody);
      line(eyesposition.x-mod, eyesposition.y-5+mody, eyesposition.x+5-mod, eyesposition.y-0+mody);
      line(eyesposition.x-mod, eyesposition.y-0+mody, eyesposition.x+5-mod, eyesposition.y-5+mody);
    } else if (eye == 10) {
      strokeWeight(3);
      //line(eyesposition.x+mod, eyesposition.y-3+mody, eyesposition.x-3+mod, eyesposition.y-3+mody);
      //line(eyesposition.x-mod, eyesposition.y-3+mody, eyesposition.x+3-mod, eyesposition.y-3+mody);
      fill(#000000);
      ellipse(eyesposition.x+mod*1.3, eyesposition.y+mody*1.1, eye-4, eye-4);
      ellipse(eyesposition.x-mod*1.3, eyesposition.y+mody*1.1, eye-4, eye-4);
      fill(#ff6666);
      stroke(#ff6666);
      noStroke();
      arc(eyesposition.x, eyesposition.y-18, 7, 7, 0, PI);
    } else {
      ellipse(eyesposition.x+mod*1.1, eyesposition.y+mody*1.1, eye, eye);
      ellipse(eyesposition.x-mod*1.1, eyesposition.y+mody*1.1, eye, eye);
    }
  }
}
