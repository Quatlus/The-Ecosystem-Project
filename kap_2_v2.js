var bunsheeps;
var predatorsAndFood;
var names;

function setup() {

	{
		backgroundColor = color(50);
		bodyCarrotColor = color(255, 102, 102, 200); //ff6666fill("#ff6666");
		headCarrotColor = color(0, 160); //12FFCD
		headColor = color(10);
		eyeColor = color("#ffffff");

		createCanvas(windowWidth, windowHeight)
		frameRate(30);
	}

	names = [['Wuti',226], ['Heidi',26], ['Schnucke',10], ['Zappo',230], ['Peppi',0], ['Flopso',255], ['Schnorksi',0], ['Pups',255], ['Schnappus',30], ['Frobso',225]];
	bunsheeps = new Array(10).fill().map((b, i) => new EsBunshee(names[i][0],names[i][1]));
	predatorsAndFood = new EsPredatorsAndFood();
}

function draw() {
	background(backgroundColor);

	for (let bunshee of bunsheeps) {
		bunshee.display();
		predatorsAndFood.predatorCheck(bunshee.karnickel);
		predatorsAndFood.carrotCheck(bunshee.karnickel);
		predatorsAndFood.checkSelf(bunshee.karnickel);
	}

	if (frameCount % predCount == 0) {
			//predatorsAndFood.predatorStart();
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
			predatorsAndFood.predatorStart();
	}
}
