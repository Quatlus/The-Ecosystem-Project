class EsPredator {

    constructor() {
      this.size = 50;
      this.acceleration = createVector(0, 0);
  		this.velocity 		= createVector(0, 0);
  		this.position 		= createVector(width+500 ,height-this.size);

    }

    show() {
      push();
      translate(-this.size/2,0);
      rect(this.position.x,this.position.y,this.size,this.size);
      pop();
    }

    attackBody(body) {
        //console.log(body.position);

        var abstand = p5.Vector.sub(body.position,this.position);
        let power = abstand.mag();
        let direction = abstand.normalize();
        direction.mult(width/power/4.5); //map(power,0,width,10,0)
        direction.y = -abs(direction.x)*6;
        //if(direction.y>-3) direction.y = 0;
        if(direction.y<-15) {
          console.log(power);
          beep(map(power, 50, 100, 20, 220),.06, 'triangle', 1);
        } //direction.y = -15;
        //let force = width-abstand;
        karnickel.addForce(direction);
      //  console.log(direction, width/power, -abs(direction.x)*2);
    }

    addForce (f) {
  		this.acceleration.add(f);
  	}

  	update () {
  		this.addForce(this.addFriction());
  		var gravity = createVector(0, 2);
  		this.addForce(gravity);

  		this.velocity.add(this.acceleration);
  		this.velocity.limit(30);
  		this.position.add(this.velocity);
  		this.acceleration.mult(0);
  	}

    checkEdges() {
  		// if (this.position.x+this.size/2 < 0) {
  		// 	this.position.x = width+this.size/2;
  		// } else if (this.position.x - this.size/2 > width) {
  		// 	this.position.x = -this.size/2;
  		// }

  		if (this.position.y > height-this.size) {
  			this.position.y = height-this.size;
  			this.velocity.y *= -.51;
  		}
  	}

    addFriction() {
  		var friction = this.velocity.copy();
  		var c =  .05;
  		friction.normalize();
  		friction.mult(-1);
  		friction.mult(c);
  		return friction;
  	}
}
