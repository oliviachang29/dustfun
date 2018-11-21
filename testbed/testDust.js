function TestDust() {
  // set time to 0
  // not entirely sure why it's necessary because it doesn't appear in any of the other simulations,
  // but everything breaks when i remove it
  this.time = 0;

  // set camera position
  camera.position.y = 1;
  camera.position.z = 3;

  // bd is a bodydef, not a real body, which all other bodies can be made from
  var bd = new b2BodyDef();
  // create ground from body
  var ground = world.CreateBody(bd);

  // set up groundbox, which is a shape
  var groundBox = new b2PolygonShape();
  groundBox.vertices[0] = new b2Vec2(-4, -1);
  groundBox.vertices[1] = new b2Vec2(4, -1);
  groundBox.vertices[2] = new b2Vec2(4, -1);
  groundBox.vertices[3] = new b2Vec2(-4, -1);
  // attach groundBox shape to ground using fixture
  ground.CreateFixtureFromShape(groundBox, 0.0);

  // it's not really a ball, i can't figure out how to make it circular :(
  var ball = new b2CircleShape;
  ball.position.Set(-3, 1.5);
  ball.radius = .7;
  this.ball = ball; // this.ball is used in the Step function
  // attach ball shape to ground using fixture
  // otherwise it'll just drop straight down
  ground.CreateFixtureFromShape(ball, 1.0);

  // setup particles
  var psd = new b2ParticleSystemDef();
  // size of individual particles
  psd.radius = 0.025; 
  psd.dampingStrength = 0.2;

  var particleSystem = world.CreateParticleSystem(psd);
  this.particleSystem = particleSystem;

  // make a shape which will be the shape of the particles
  var box = new b2PolygonShape();
  box.SetAsBoxXYCenterAngle(0.5, 2, new b2Vec2(0, 1.0), 0);
  
  var pgd = new b2ParticleGroupDef();
  // use the box we made just now as the shape for the particles
  pgd.shape = box;
  // can set the group's entire flags as either solid or rigid
  // https://google.github.io/liquidfun/Programmers-Guide/html/md__chapter11__particles.html#pb
  pgd.groupFlags = b2_rigidParticleGroup;
  // can also set the particles as elastic, powder, spring, etc
  // pgd.flags = b2_elasticParticle

  var pg = particleSystem.CreateParticleGroup(pgd);
}

TestDust.prototype.Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);
  // increment time, which is weird
  this.time += 1 / 60;

  // move the ball 2 units per second
  this.ball.position.Set(-3 + this.time*2, 1.5);
}