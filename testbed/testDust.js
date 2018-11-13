function TestDust() {
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

  bd.type = b2_dynamicBody;
  bd.allowSleep = false;
  bd.position.Set(0, 1);
  var body = world.CreateBody(bd);

  var ball = new b2CircleShape;
  ball.position.Set(-2, 0);
  ball.radius = .7;
  this.ball = ball;
  body.CreateFixtureFromShape(ball, 1.0);

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
  pgd.groupFlags = b2_rigidParticleGroup;

  var pg = particleSystem.CreateParticleGroup(pgd);

  this.time = 0;
}

TestDust.prototype.Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);
  this.time += 1 / 60;

  this.ball.position.Set(-2 + this.time*12, 0);

  console.log(this.particleSystem.GetPositionBuffer())
}