var bunshee;

var mx;
var my;


function setup() {

	brushColor      = color("#A24682");
	bodyColor       = color(30);
	backgroundColor = color(50);
	bodyCarrotColor = color(255, 102, 102, 200);//ff6666fill("#ff6666");
	headCarrotColor = color(70,140); //12FFCD
	headColor       = color(10);
	eyeColor        = color("#ffffff");

	createCanvas(windowWidth, windowHeight)
	frameRate(30);

	bunshee = new EsBunshee();

}

function draw() {

	bunshee.display();

	if (frameCount%predCount == 0) {
		bunshee.predatorStart();
	}

}

function keyPressed() {
	if (keyCode == 70) {
		karnickel.feed(10);
	}

	if (keyCode == 80) {
		bunshee.predatorStart();
	}
}
