var bunsheeps;
var predatorsAndFood;
var names;
var predCount = 300;

function setup() {
	createCanvas(windowWidth, windowHeight)
	frameRate(30);

	names = {
		'Wuti': 226,
		'Heidi': 26,
		'Schnucke': 10,
		'Zappo': 230,
		'Peppi': 0,
		'Flopso': 255,
		'Schnorksi': 0,
		'Pups': 255,
		'Schnappus': 30,
		'Frobso': 225
	}

	bunsheeps = new Array(3).fill().map((b, i) => new EsBunshee(Object.keys(names)[i], Object.values(names)[i]));
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
		predatorsAndFood.predatorStart();
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

	if (keyCode == 77) {
		let i = bunsheeps.length - 1;
		//console.log(Object.keys(names)[i], Object.values(names)[i]);
		bunsheeps.push(new EsBunshee(Object.keys(names)[i], Object.values(names)[i]));
	}

}
