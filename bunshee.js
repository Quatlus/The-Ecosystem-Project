class EsBunshee {
  constructor( name, color_ ) {
    this.name = name;
    this.eye = 3;
    this.framesActive = false;
    this.hit = false;
    this.mode = 1;
    this.left;
    this.right;
    this.up;
    strokeCap( PROJECT );
    this.karnickel = new EsBody( 55, name, color_, this );
    this.karnickel.addForce( new p5.Vector( -4, -120 ) );
    this.left = createVector( -5, 0 );
    this.right = p5.Vector.mult( this.left, -1 );
    this.up = createVector( 0, -15 );
    this.ps = new ParticleSystem( 299, 200, this.karnickel );
    bodyCarrotColor = color( 255, 102, 102, 200 );
    backgroundColor = color( 50 );
    headCarrotColor = color( 0, 160 ); //12FFCD
    headColor = color( 10 );
    eyeColor = color( "#ffffff" );
  }
  setHit( hit ) {
    this.hit = hit;
  }
  setMode( mode ) {
    this.mode = mode;
  }
  setFramesActive( framesActive ) {
    this.framesActive = framesActive;
  }
  display() {
    this.karnickel.checkEdges();
    this.karnickel.update();
    this.karnickel.show();
    if ( this.hit > 0 ) {
      if ( this.mode == 1 ) {
        this.karnickel.kopf.eye = 10;
      } else {
        this.karnickel.kopf.eye = 15;
      }
      if ( frameCount - this.framesActive > 30 ) {
        this.hit = 0;
        this.karnickel.kopf.eye = 1;
      }
    }
    this.ps.run();
    if ( keyIsDown( 37 ) ) {
      this.karnickel.addForce( this.left );
    }
    if ( keyIsDown( 39 ) ) {
      this.karnickel.addForce( this.right );
    }
    if ( keyIsDown( 32 ) || keyIsDown( 38 ) ) {
      this.karnickel.addForce( this.up );
    }
    noStroke();
    textSize( 10 );
    fill( 120, 255 );
    text( 'control: left arrow & up arrow | space bar & right arrow', 10, 30 );
    text( 'predator: hit p', 10, 50 );
    text( nf( frameCount, 8, 0 ) + ' // ' + nf( round( millis() / 1000 ), 8, 0 ) +
      ' // ' + nf( round( this.karnickel.size ), 10, 0 ), 10, 70 );
  }
  static beep( f, t, w, a, rt, ft ) {
    var wave;
    wave = new p5.Oscillator();
    wave.setType( w );
    wave.start();
    //console.log('sound', f, t, w, a, rt, ft);
    //  f = map(f, 50, 100, 50, 600);
    // if (ft != 0) {
    //   wave.amp(a, rt);
    //   wave.freq(f, ft);
    //   //  console.log(f, f, a);
    // } else {
    wave.amp( abs( a ) );
    wave.freq( f );
    // }
    wave.stop( t );
  }
}
