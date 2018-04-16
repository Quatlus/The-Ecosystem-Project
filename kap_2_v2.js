var bunsheeps;
var predatorsAndFood;
var names;

function setup() {

	{
		backgroundColor = color(200, 30, 30);
		backgroundColor = color(80);

		bodyCarrotColor = color(255, 102, 102, 200); //ff6666fill("#ff6666");
		headCarrotColor = color(50, 240); //12FFCD
		headColor = color(10);
		eyeColor = color("#ffffff");

		createCanvas(windowWidth, windowHeight)
		frameRate(30);
	}

	names = ['Heidi', 'Schnucke', 'Zappo', 'Peppi', 'Flopso'];
	bunsheeps = new Array(2).fill().map((b, i) => new EsBunshee(names[i]));
	predatorsAndFood = new EsPredatorsAndFood();
}

function draw() {
	background(backgroundColor);

	for (let bunshee of bunsheeps) {
		bunshee.display();
		predatorsAndFood.predatorCheck(bunshee.karnickel);
		//console.log('oben ' + bunshee.karnickel.name);
	}

	if (frameCount % predCount == 0) {
		for (let bunshee of bunsheeps) {
			predatorsAndFood.predatorStart();
		}
	}

	predatorsAndFood.predatorShow();
	predatorsAndFood.carrotsCheckEnd(bunsheeps);
	predatorsAndFood.carrotsShow();

}

function keyPressed() {
	if (keyCode == 70) {
		//karnickel.feed(10);
	}
	if (keyCode == 80) {
		for (let bunshee of bunsheeps) {
			predatorsAndFood.predatorStart();
		}
	}
}
