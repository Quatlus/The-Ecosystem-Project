class EsCarrot {
  constructor( x, y, s ) {
    this.position = createVector( x, y );
    this.acceleration = createVector( 0, 0 );
    this.velocity = createVector( 0, 0 );
    this.size = s;
    this.addForce( createVector( .4, 0 ) );
    this.red = random( 255, 255 );
  }
  show() {
    fill( this.red, 102, 102 );
    noStroke();
    push();
    translate( this.position.x, this.position.y );
    var tmp = this.velocity.copy();
    var dir = atan( tmp.y / tmp.x );
    rotate( -HALF_PI + dir );
    triangle( 0, 0, this.size, 0, this.size / 2, this.size * 3 );
    fill( headCarrotColor );
    triangle( 0, 0, this.size / 3, 0, 0 - this.size / 6, -this.size );
    triangle( this.size / 3, 0, this.size / 3 * 2, 0, this.size / 2, -this.size );
    triangle( this.size / 3 * 2, 0, this.size / 3 * 3, 0, this.size + this.size /
      6, -this.size );
    pop();
  }
  update() {
    var friction = this.velocity.copy();
    var c = .023;
    friction.normalize();
    friction.mult( -1 );
    friction.mult( c );
    this.addForce( friction );
    this.velocity.limit( 8 );
    this.velocity.add( this.acceleration );
    this.position.add( this.velocity );
    this.acceleration.mult( 0 );
  }
  addForce( f ) {
    var force = p5.Vector.mult( f, this.size );
    this.acceleration.add( force );
  }
  checkFloor( bunsheeps ) {
    if ( this.position.x > width ) {
      this.position.x -= width + 150;
      this.velocity.x = .2 / this.size;
      for ( let bunshee of bunsheeps ) {
        bunshee.karnickel.feed( -map( bunshee.karnickel.size, 50, 250, .5, 5 ) );
        bunshee.karnickel.parent.setFramesActive( frameCount );
        bunshee.karnickel.parent.setHit( 1 );
        bunshee.karnickel.parent.setMode( 2 );
      }
      //beep(f, t, w, a, rt, fm)
      //EsBunshee.beep(map(this.size, 25, 20, 48, 60), .4, 'sine', .8, .3, 3);
      EsBunshee.beep( map( this.size, 50, 100, 90, 220 ), .06, 'sine', .05, .1, 0 );
    }
    if ( this.position.y < -50 ) {
      this.position.y = height + 50;
    }
    if ( this.position.y > height + 50 ) {
      this.position.y = -50;
    }
  }
}
