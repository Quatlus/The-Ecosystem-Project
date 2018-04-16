class EsBody {

	constructor(size, name, color_, this_) {

		this.Child = EsHead;
		this.Child.prototype.parent = this;

		this.parent = this_;

		this.name = "EsBody-" + name;
		this.size = size;
		this.mass = size / 20;
		this.acceleration = createVector(0, 0);
		this.velocity = createVector(0, 0);
		this.position = createVector(random(width/2)+200, height);
		this.kopf = new EsHead(this.size / 3.5, this.position.x, this.position.y -
			this.size / 2, this);
		ellipseMode(RADIUS);

		this.bodyColor = color(color_);//color(random(60, 240));
		// console.log(this.position);
	}

	addForce(f) {
		f = p5.Vector.div(f, this.mass);
		this.acceleration.add(f);
	}

	update() {
		this.addForce(this.addFriction());
		var gravity = createVector(0, 2 * this.mass);
		this.addForce(gravity);

		this.velocity.add(this.acceleration);
		this.velocity.limit(30);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}

	show() {
		noStroke();
		var slowPosition = this.position.copy();
		var localSpeed = this.velocity.copy();
		slowPosition.sub(localSpeed.mult(.5));
		fill(this.bodyColor);
		for (var i = 0; i < 360; i += 20 ) { //- (this.size / 20)
			var ix = cos(radians(i)) * this.size;
			var iy = sin(radians(i)) * this.size;
			ellipse(slowPosition.x + ix, slowPosition.y - 50 + iy, 20 + this.size / 15,
				20 + this.size / 15);
		}
		fill(this.bodyColor);
		ellipse(this.position.x, this.position.y - 50, this.size, this.size);
		fill(10);
		ellipse(this.position.x, this.position.y, this.size / 3, this.size / 3);

		this.kopf.show(this.position.x, this.position.y - this.size, this.velocity);
	}

	checkEdges() {
		// if (this.position.x + this.size / 2 < 0) {
		// 	this.position.x = width + this.size / 2;
		// } else if (this.position.x - this.size / 2 > width) {
		// 	this.position.x = -this.size / 2;
		// }

		if (this.position.x - this.size < 0) {
			this.position.x = this.size ;
		} else if (this.position.x + this.size > width) {
			this.position.x = width - this.size;

		}

		if (this.position.y > height) {
			this.position.y = height;
			this.velocity.y *= -.51;
		}
	}

	addFriction() {
		var friction = this.velocity.copy();
		var c = 2;
		friction.normalize();
		friction.mult(-1);
		friction.mult(c);
		if (this.position.y > height - this.size / 2 - 1) {
			return friction;
		} else {
			return createVector(0, 0);
		}
	}

	feed(cal) {
		
		this.size = this.size + cal;
		if (this.size < 40) {
			this.size = 40;
		}
		if (this.size > 250) {
			this.size = 250;
		}
	}

}
