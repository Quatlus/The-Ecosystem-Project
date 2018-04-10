function setup() {
	brushColor      = color("#A24682");
	bodyColor       = color(120);
	backgroundColor = color(100);
	bodyCarrotColor = color(255, 102, 102, 200);//ff6666fill("#ff6666");
	headCarrotColor = color(70,140); //12FFCD
	headColor       = color(10);
	eyeColor        = color("#ffffff");

	strokeCap(PROJECT);
	var carrotCount = 12;

	createCanvas(windowWidth, windowHeight)
	frameRate(30);
	karnickel = new EsBody(80);
	karnickel.addForce(new p5.Vector(-4,-120));

	for (let i = 0; i < carrotCount; i++) {
		carrots.push(new EsCarrot(random(-300, 0), 100+i*(height/2-50)/carrotCount, random(5, 20)));
	}

	this.left = createVector(-5, 0);
	this.right = p5.Vector.mult(left, -1);
	this.up = createVector(0, -15);

 	predator = new EsPredator();
}

function draw() {
	background(this.backgroundColor);
	karnickel.checkEdges();
	karnickel.update();
	karnickel.show();

	carrots.forEach (function(carrot) {
		carrot.update();
    carrot.show();
		carrot.checkFloor();
		karnickel.checkCollision(carrot);
	});

	if (hit > 0) {
    if (mode == 1) {
      eye = 10;
    } else {
      eye = 15;
    }
    if (frameCount - framesActive > 30) {
      hit = 0;
      eye = 1;

    }
  }
	predator.checkEdges();
	predator.update();
	predator.show();
	predator.attackBody(karnickel);

	run =  run + .005;
	wind = noise(run)-.5;

	if (keyIsDown(37)) {
		karnickel.addForce(left);
		// karnickel.velocity.add(createVector(-2, 0));
	}
	if (keyIsDown(39)) {
		karnickel.addForce(right);
		// karnickel.velocity.add(createVector(2, 0));
	}
	if (keyIsDown(32) || keyIsDown(38)) {
		karnickel.addForce(up);
	}

	textSize(14);
	fill(140);
	text('control: left arrow & up arrow || space bar & right arrow', 10, 30);
	text('predator: p', 10, 50);
}

function keyPressed() {
	// if (key==' ') {
	// 	karnickel.addForce(up);
	// }
	if (keyCode == 70) {
		karnickel.feed(10);
	}

	if (keyCode == 80) {
		predator.velocity.x = 0;
		predator.position.x = width + 50;
		predator.addForce(createVector(-15,0));
	}
}
