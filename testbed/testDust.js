function TestDust() {
  this.time = 0;

  camera.position.y = 1;
  camera.position.z = 3;

  var bd = new b2BodyDef();
  var ground = world.CreateBody(bd);

  var groundBox = new b2PolygonShape();
  groundBox.vertices[0] = new b2Vec2(-4, -1);
  groundBox.vertices[1] = new b2Vec2(4, -1);
  groundBox.vertices[2] = new b2Vec2(4, -1);
  groundBox.vertices[3] = new b2Vec2(-4, -1);
  ground.CreateFixtureFromShape(groundBox, 0.0);

  // it's not really a ball, i can't figure out how to make it circular :(
  var ball = new b2CircleShape;
  // ball.position.Set(-10, 10);
  ball.radius = .7;
  this.ball = ball;
  ground.CreateFixtureFromShape(ball, 1.0);

  // var ballDef = new b2BodyDef;
  // ballDef.type = b2_dynamicBody;
  // ballDef.position.Set(0, 1)
  // ballDef.bullet = true;
  // var ball = world.CreateBody(ballDef)

  // setup particles
  var psd = new b2ParticleSystemDef();
  psd.radius = 0.025;
  psd.dampingStrength = 0.2;


  var particleSystem = world.CreateParticleSystem(psd);
  this.particleSystem = particleSystem;

  var box = new b2PolygonShape();

  box.SetAsBoxXYCenterAngle(0.5, 2, new b2Vec2(0, 1.0), 0);
  
  var pgd = new b2ParticleGroupDef();
  pgd.shape = box;
  pgd.flags = b2_wallParticle;

  var pg = particleSystem.CreateParticleGroup(pgd);
}

TestDust.prototype.Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);
  this.time += 1 / 60;

  this.ball.position.Set(-4 + this.time*2, 1.25);

  // console.log(this.particleSystem.GetPositionBuffer())
}