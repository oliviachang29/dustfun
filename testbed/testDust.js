function TestDust() {
  /* notes
  - only one particle system def
  - only one particle system
  - create a new particle group def for each particle group
  */

  // set camera position
  camera.position.y = 0;
  camera.position.z = 3;

  // bd is a bodydef, not a real body, which all other bodies can be made from
  var bd = new b2BodyDef();
  var ground = world.CreateBody(bd);

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

  // setup particles
  var psd = new b2ParticleSystemDef();
  // size of individual particles
  psd.radius = 0.025; 
  // psd.dampingStrength = 0.2;
  var particleSystem = world.CreateParticleSystem(psd);

  // metal ball
  var circle = new b2CircleShape();
  circle.position.Set(-2, 1);
  circle.radius = 0.5;
  var pgd = new b2ParticleGroupDef();
  pgd.groupFlags = b2_rigidParticleGroup | b2_solidParticleGroup;
  pgd.flags = b2_particleContactListenerParticle;
  pgd.shape = circle;
  pgd.color.Set(255, 0, 0, 255);
  // make it move
  pgd.linearVelocity = (new b2Vec2(180, -100)); // degrees, speed+direction
  var ball = particleSystem.CreateParticleGroup(pgd);

  // var f = ground.GetWorldVector(new b2Vec2(180, -100));
  // var p = ground.GetWorldPoint(new b2Vec2(0, 10));
  // ball.ApplyForce(f, p, true);

  // wall
  var box = new b2PolygonShape();
  pgd = new b2ParticleGroupDef;
  box.SetAsBoxXY(0.5, 2);
  pgd.groupFlags = b2_rigidParticleGroup;
  pgd.flags = b2_particleContactListenerParticle;
  pgd.position.Set(1,0);
  pgd.shape = box;
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

  // if (this.contact) {
  //   console.log('this.contact')
  // }

}