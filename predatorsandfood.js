class EsPredatorsAndFood {
  constructor() {
    this.predator = new EsPredator();
    this.carrots = [];
    this.carrotCount = 20;
    this.wind = 0;
    this.run = 0;
    for ( let i = 0; i < this.carrotCount; i++ ) {
      this.carrots.push( new EsCarrot( random( -300, 0 ), 100 + i * ( height / 1.5 +
        50 ) / this.carrotCount, random( 5, 20 ) ) );
    }
  }
  carrotsShow() {
    this.run = this.run + .01;
    this.wind = noise( this.run ) - .5;
    var xwind = map( this.wind, -.5, .5, .42, .46 );
    var that = this;
    this.carrots.forEach( function ( carrot ) {
      if ( carrot.position.x > width / 3 ) {
        carrot.addForce( createVector( abs( xwind / 20 ), that.wind / 20 ) );
      } else {
        carrot.addForce( createVector( abs( xwind / 15 ), that.wind / 50 ) );
      }
      carrot.update();
      carrot.show();
    } );
  }
  carrotsCheckEnd( bunsheeps ) {
    this.carrots.forEach( function ( carrot ) {
      carrot.checkFloor( bunsheeps );
    } );
  }
  carrotCheck( karnickel ) {
    this.carrots.forEach( function ( carrot ) {
      var kopf_links = karnickel.kopf.headposition.x - karnickel.kopf.size;
      var kopf_rechts = karnickel.kopf.headposition.x + karnickel.kopf.size;
      var carotte_x = carrot.position.x + carrot.size / 1;
      var kopf_oben = karnickel.kopf.headposition.y - 1.5 * karnickel.kopf
        .size;
      var kopf_unten = karnickel.kopf.headposition.y + .5 * karnickel.kopf
        .size;
      var carotte_y = carrot.position.y - carrot.size / 2;
      if ( carotte_x > kopf_links && carotte_x < kopf_rechts ) {
        if ( carotte_y > kopf_oben && carotte_y < kopf_unten ) {
          karnickel.parent.setFramesActive( frameCount );
          karnickel.parent.setHit( 1 );
          karnickel.parent.setMode( 1 );
          carrot.position.x = -random( 100, 200 );
          karnickel.feed( map( carrot.size, 5, 20, 2, 10 ) );
          //  console.log(karnickel.size);
          //beep(f, t, w, a, rt, ft) {sawtooth
          EsBunshee.beep( map( karnickel.size, 50, 300, 120, 30 ), 1, 'sine', .05, 0, 0 );
        }
      }
    } );
  }
  checkSelf( body ) {
    for ( let otherbody of bunsheeps ) {
      //console.log(otherbody.karnickel,body);
      otherbody = otherbody.karnickel;
      if ( otherbody != body ) {
        let abstand = p5.Vector.sub( body.position, otherbody.position );
        let power = abstand.mag();
        if ( power < body.size * 2 ) {
          let direction = abstand.normalize();
          direction.mult( 5 );
          body.addForce( direction );
        }
      }
    }
    // let power = abstand.mag();
    // let direction = abstand.normalize();
  }
  predatorShow() {
    this.predator.checkEdges();
    this.predator.update();
    this.predator.show();
  }
  predatorCheck( karnickel ) {
    this.predator.attackBody( karnickel );
  }
  predatorStart() {
    this.predator.velocity.x = 0;
    this.predator.position.x = width + 50 - random( 100 );
    this.predator.addForce( createVector( -20, 0 ) );
    this.predCount = round( random( 401, 1201 ) );
  }
}
