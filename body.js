class EsBody {

	constructor(size) {
		this.size = size;
		this.mass = size/20;
		this.acceleration = createVector(0, 0);
		this.velocity 		= createVector(0, 0);
		this.position 		= createVector(width/2 ,height);
		this.kopf = new EsHead(this.size/3.5, this.position.x, this.position.y-this.size/2);
		ellipseMode(RADIUS);
		//console.log(this.size);
	}

	addForce (f) {
		f = p5.Vector.div(f, this.mass);
		this.acceleration.add(f);
	}

	update () {
		this.addForce(this.addFriction());
		var gravity = createVector(0, 2*this.mass);
		this.addForce(gravity);

		this.velocity.add(this.acceleration);
		this.velocity.limit(30);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}

	show () {
		noStroke();
		var slowPosition = this.position.copy();
		var localSpeed = this.velocity.copy();
		slowPosition.sub(localSpeed.mult(1));
		fill(70);
		for (var i = 0; i < 360; i+=20-(karnickel.size/20)) {
			var ix = cos(radians(i))*this.size;
			var iy = sin(radians(i))*this.size;
			ellipse(slowPosition.x+ix, slowPosition.y-50+iy, 20+karnickel.size/15, 20+karnickel.size/15);
		}
		fill(70);
		ellipse(this.position.x, this.position.y-50, this.size, this.size);
		fill(65);
		ellipse(this.position.x, this.position.y, this.size/3, this.size/3);

		this.kopf.show(	this.position.x, this.position.y-this.size,	this.velocity);
	}

	checkEdges() {
		if (this.position.x+this.size/2 < 0) {
			this.position.x = width+this.size/2;
		} else if (this.position.x - this.size/2 > width) {
			this.position.x = -this.size/2;
		}

		if (this.position.y > height) {
			this.position.y = height;
			this.velocity.y *= -.51;
		}
	}

	checkCollision(carrot) {

		var kopf_links = this.kopf.headposition.x-this.kopf.size;
		var kopf_rechts = this.kopf.headposition.x+this.kopf.size;
		var carotte_x = carrot.position.x+carrot.size/1;
		var kopf_oben = this.kopf.headposition.y-1.5*this.kopf.size;
		var kopf_unten = this.kopf.headposition.y+.5*this.kopf.size;
		var carotte_y = carrot.position.y-carrot.size/2;

		// strokeWeight(1);
		// stroke(0, 255, 0, 120);
		// fill(255, 0);
		// ellipse(carotte_x, carotte_y, 5, 5);
		// stroke(0, 255, 0, 20);
		// ellipse(kopf_links, this.kopf.headposition.y-this.kopf.size/2, 2, 2);
		// ellipse(kopf_rechts, this.kopf.headposition.y-this.kopf.size/2, 2, 2);
		// ellipse(this.kopf.headposition.x, kopf_oben, 2, 2);
		// ellipse(this.kopf.headposition.x, kopf_unten, 2, 2);

		if (carotte_x > kopf_links && carotte_x < kopf_rechts) {
			if (carotte_y > kopf_oben && carotte_y < kopf_unten) {
				framesActive = frameCount;
				hit++;
				mode = 1;
				carrot.position.x = -random(100, 200);
				karnickel.feed(map(carrot.size, 5, 20, 5, 20));

				beep(map(carrot.size, 5, 20, 40, 60),.15, 'square', .5);
			}
		}
	}

	addFriction() {
		var friction = this.velocity.copy();
		var c =  2;
		friction.normalize();
		friction.mult(-1);
		friction.mult(c);
		if (this.position.y > height - this.size/2 - 1) {
			return friction;
		} else {
			return createVector(0,0);
		}
	}

	feed (cal) {
		this.size = this.size + cal;
		if (this.size < 50) {
			this.size = 50;
		}
		if (this.size > 250) {
			this.size = 250;
		}
	}

}
