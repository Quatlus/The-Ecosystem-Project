class EsPredator {
  constructor() {
    this.size = 40;
    this.acceleration = createVector( 0, 0 );
    this.velocity = createVector( 0, 0 );
    this.position = createVector( width + 500 - random( 100 ), height - this.size );
    this.red = random( 50, 80 );
  }
  show() {
    push();
    fill( bodyCarrotColor );
    translate( -this.size / 2, 0 );
    rect( this.position.x, this.position.y, this.size, this.size );
    pop();
  }
  attackBody( body ) {
    var abstand = p5.Vector.sub( body.position, this.position );
    let power = abstand.mag();
    let direction = abstand.normalize();
    direction.mult( width / power / 4.5 ); //map(power,0,width,10,0)
    direction.y = -abs( direction.x ) * 6;
    //if(direction.y>-3) direction.y = 0;
    if ( direction.y < -12 ) {
      //  beep(f, t, w, a, rt, ft) {
      EsBunshee.beep( map( power, 50, 100, 100, 600 ), .05, 'triangle', .01, 1, 0 );
    }
    body.addForce( direction );
  }
  addForce( f ) {
    this.acceleration.add( f );
  }
  update() {
    this.addForce( this.addFriction() );
    var gravity = createVector( 0, 2 );
    this.addForce( gravity );
    this.velocity.add( this.acceleration );
    this.velocity.limit( 30 );
    this.position.add( this.velocity );
    this.acceleration.mult( 0 );
  }
  checkEdges() {
    if ( this.position.y > height - this.size ) {
      this.position.y = height - this.size;
      this.velocity.y *= -.51;
    }
  }
  addFriction() {
    var friction = this.velocity.copy();
    var c = .05;
    friction.normalize();
    friction.mult( -1 );
    friction.mult( c );
    return friction;
  }
}
