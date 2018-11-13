function TestWaveMachine() {
  camera.position.y = 1;
  camera.position.z = 2.5;

  var bd = new b2BodyDef();
  var ground = world.CreateBody(bd);

  bd.type = b2_dynamicBody;
  bd.allowSleep = false;
  bd.position.Set(0, 1);
  var body = world.CreateBody(bd);

  var wall = new b2PolygonShape();
  wall.SetAsBoxXYCenterAngle(0.5, 2, new b2Vec2(2, 0), 0);
  body.CreateFixtureFromShape(wall, 5);
  
  var ball = new b2CircleShape;
  ball.position.Set(-2, 0);
  ball.radius = .7;
  body.CreateFixtureFromShape(ball, 1.0);

  // can we get it to not be a revolute joint?
  var jd = new b2RevoluteJointDef();
  jd.motorSpeed = 0.05 * Math.PI;
  jd.maxMotorTorque = 1e7;
  jd.enableMotor = true;
  this.joint = jd.InitializeAndCreate(ground, body, new b2Vec2(0, 1));
  this.time = 0;

  var prismaticJointDef = new b2PrismaticJointDef();
  prismaticJointDef.bodyA = ground;
  prismaticJointDef.bodyB = ball;
  prismaticJointDef.collideConnected = true;
  prismaticJointDef.localAxisA.Set(1,0);
  prismaticJointDef.localAnchorA.Set(-2, 0);
  prismaticJointDef.enableMotor = true;
  this.prismaticJoint = world.CreateJoint(prismaticJointDef);

  // setup particles
  // var psd = new b2ParticleSystemDef();
  // psd.radius = 0.025;
  // psd.dampingStrength = 0.2;

  // var particleSystem = world.CreateParticleSystem(psd);
  // var box = new b2PolygonShape();
  // box.SetAsBoxXYCenterAngle(0.9, 0.9, new b2Vec2(0, 1.0), 0);

  // var particleGroupDef = new b2ParticleGroupDef();
  // particleGroupDef.shape = box;
  // var particleGroup = particleSystem.CreateParticleGroup(particleGroupDef);
}

TestDust.prototype.Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);
  this.time += 1 / 60;
  // this.joint.SetMotorSpeed(0.05 * Math.cos(this.time) * Math.PI);
  this.joint.SetMotorSpeed(0);
  this.prismaticJoint.SetMotorSpeed(0.1);
}