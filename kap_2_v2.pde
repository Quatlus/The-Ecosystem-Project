Body karnickel;
PVector left;
PVector right;
PVector up;
color brushColor;
color bodyColor;
color backgroundColor;
color bodyCarrotColor;
color headCarrotColor;
color headColor;
color eyeColor;
int brush;
ArrayList<Carrot> carrots = new ArrayList<Carrot>();
float wind;
float run;
float eye;
float framesActive;
float hit;
float mode = 1;

void setup () {
  size(900, 500);
  brushColor      = color(#A24682);
  bodyColor       = color(50);
  backgroundColor = color(100);
  bodyCarrotColor = color(#ff6666);
  headCarrotColor = color(#12FFCD);
  headColor =       color(10);
  eyeColor =        color(#ffffff);

  strokeCap(PROJECT);
  brush = 5;
  float carrotCount = 10;

  karnickel = new Body(random(180, 180));

  left = new PVector(-5, 0);
  right = PVector.mult(left, -1);
  up = new PVector(0, -55);

  for (int i = 0; i < carrotCount; i++) {
    carrots.add(new Carrot(random(-width, 0), 100+i*(height/2-50)/carrotCount, random(5, 20)));
  }
}
void draw () {
  background(backgroundColor);
  karnickel.checkEdges();
  karnickel.update();
  karnickel.show();

  for (Carrot carr : carrots) {
    carr.update();
    carr.show();
    carr.checkFloor();
    karnickel.checkCollision(carr);
  }

  if (hit > 0) {
    if (mode == 1) {
      //headColor = color(#000000);
      eye = 10;
    } else {
      //headColor = color(#ffffff);
      eye = 15;
    }
    if (frameCount - framesActive > 30) {
      hit = 0;
      // headColor = color(#ffffff);
      eye = 3;
    }
  }

  run =  run + .005;
  wind = noise(run)-.5;

}

void mousePressed() {
   karnickel.addForce(up);
}

void keyPressed() {
  if (key == CODED) {
    if (keyCode == 37) {
      karnickel.addForce(left);
      karnickel.velocity.add(new PVector(-2, 0));
    } 
    if (keyCode == 39) {
      karnickel.addForce(right);
      karnickel.velocity.add(new PVector(2, 0));
    }
  } else {
    if (key==' ') {
      karnickel.addForce(up);
    }
    if (key == 'f') {
      karnickel.feed(10);
    }
  }
}
