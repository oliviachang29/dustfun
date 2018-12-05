function TestDust() {
  /* notes
  - only one particle system def
  - only one particle system
  - create a new particle group def for each particle group
  */

  this.time = 0;

  // set camera position
  camera.position.y = 0;
  camera.position.z = 3;

  // bd is a bodydef, not a real body, which all other bodies can be made from
  var bd = new b2BodyDef();
  var ground = world.CreateBody(bd);

  bd.type = b2_dynamicBody;
  bd.allowSleep = false;
  bd.position.Set(0, 1);
  var body = world.CreateBody(bd);

  var ball = new b2CircleShape;
  ball.position.Set(0, 0);
  ball.radius = .2;
  this.ball = ball;
  body.CreateFixtureFromShape(ball, 1.0);

  // move this to a function later
  // ground
  var groundBox = new b2PolygonShape();
  var vertices = groundBox.vertices;
  vertices.push(new b2Vec2(-4, -3));
  vertices.push(new b2Vec2(4, -3));
  vertices.push(new b2Vec2(4, -2));
  vertices.push(new b2Vec2(-4, -2));
  ground.CreateFixtureFromShape(groundBox, 0);

  // set some walls so it doesn't slide off
  var leftSideBox = new b2PolygonShape();
  var vertices = leftSideBox.vertices;
  vertices.push(new b2Vec2(-4, -2));
  vertices.push(new b2Vec2(-3, -2));
  vertices.push(new b2Vec2(-3, 3));
  vertices.push(new b2Vec2(-4, 3));
  ground.CreateFixtureFromShape(leftSideBox, 0);

  var rightSideBox = new b2PolygonShape();
  var vertices = rightSideBox.vertices;
  vertices.push(new b2Vec2(4, -2));
  vertices.push(new b2Vec2(3, -2));
  vertices.push(new b2Vec2(3, 3));
  vertices.push(new b2Vec2(4, 3));
  ground.CreateFixtureFromShape(rightSideBox, 0);

  var roofBox = new b2PolygonShape();
  var vertices = roofBox.vertices;
  vertices.push(new b2Vec2(-4, 3));
  vertices.push(new b2Vec2(4, 3));
  vertices.push(new b2Vec2(4, 2));
  vertices.push(new b2Vec2(-4, 2));
  ground.CreateFixtureFromShape(roofBox, 0);

  // setup particles
  var psd = new b2ParticleSystemDef();
  psd.radius = 0.025; // size of individual particles
  // psd.dampingStrength = 0.2;
  var particleSystem = world.CreateParticleSystem(psd);

  // metal ball
  var circle = new b2CircleShape();
  circle.position.Set(-2, 1);
  circle.radius = 0.5;
  var pgd = new b2ParticleGroupDef();
  pgd.groupFlags = b2_rigidParticleGroup | b2_solidParticleGroup;
  // pgd.flags = b2_solidParticleGroup;

  pgd.shape = circle;
  pgd.strength = 1;
  pgd.color.Set(255, 0, 0, 255);
  // make it move
  pgd.linearVelocity = (new b2Vec2(180, -100)); // degrees, speed+direction
  var ball = particleSystem.CreateParticleGroup(pgd);

  // var f = ground.GetWorldVector(new b2Vec2(180, -100));
  // var p = ground.GetWorldPoint(new b2Vec2(0, 10));
  // ball.ApplyForce(f, p, true);

  // wall
  var box1 = new b2PolygonShape();
  pgd = new b2ParticleGroupDef;
  box1.SetAsBoxXY(0.5, 0.25);
  pgd.strength = 1.0;
  pgd.groupFlags = b2_rigidParticleGroup;
  pgd.flags = b2_wallParticle | b2_barrierParticle;
  pgd.position.Set(1,-1.75);
  pgd.shape = box1;
  pgd.color.Set(0,0,255,255);
  particleSystem.CreateParticleGroup(pgd);

  var box2 = new b2PolygonShape();
  pgd = new b2ParticleGroupDef;
  box2.SetAsBoxXY(0.5, 0.75);
  pgd.groupFlags = b2_rigidParticleGroup;
  pgd.position.Set(1,-0.75);
  pgd.shape = box2;
  pgd.color.Set(0,0,100,255);
  pgd.strength = 0;
  this.box2 = particleSystem.CreateParticleGroup(pgd);

  var box3 = new b2PolygonShape();
  pgd = new b2ParticleGroupDef;
  box3.SetAsBoxXY(0.5, 1);
  pgd.strength = 1.0;
  pgd.groupFlags = b2_rigidParticleGroup;
  pgd.flags = b2_wallParticle | b2_barrierParticle;
  pgd.position.Set(1,1);
  pgd.shape = box3;
  pgd.color.Set(0,0,255,255);
  particleSystem.CreateParticleGroup(pgd);

  world.SetContactListener(this);
}

TestDust.prototype.BeginContactBody = function(contact) {
  // if (contact.GetFixtureA().GetUserData() !== null ||
  //   contact.GetFixtureB().GetUserData() !== null) {
  //   var worldManifold = contact.GetWorldManifold();
  //   this.contactPoint = worldManifold.GetPoint(0);
  //   this.contact = true;
  // }
  console.log('contact')
};

TestDust.prototype.Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);

  this.time += 1/60

  if (this.time == 2/60) {
    // this.box2.flags = b2_powderParticle
  }

  // if (this.contact) {
  //   console.log('this.contact')
  // }

}