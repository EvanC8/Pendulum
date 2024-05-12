let pendulum; // Pendulum object

let gravity = 2000; // Gravity constant
let substeps = 10; // Substeps for Euler approximation of pendulum angle
let startTime; // For calculating timestep between draw function updates

function setup() {
  createCanvas(400, 400);
  
  // Set up pendulum
  let radius = 200; // Length
  let origin = {x:200, y:10}; // Anchor point
  let initAngle = PI/4; // Initial angle (In radians)
  
  // Make pendulum
  pendulum = new Pendulum(radius, origin, initAngle);
  
  // Initialize start time
  startTime = new Date();
}

// Draw and update pendulum angle
function draw() {
  background(255);
  
  // Calulate timestep since last loop
  let timeNow = new Date();
  let timeElapsed = (timeNow - startTime) / 1000;
  
  // Apply Euler's Method to approximate new position of pendulum
  let subtime = timeElapsed / substeps;
  for (let i = 0; i < substeps; i++) {
    // Apply angular force (Torque) to pendulum
    pendulum.applyForce(gravity, subtime);
  }
  
  let angle = pendulum.angle();
  let origin = pendulum.origin();
  let radius = pendulum.radius();
  
  // Convert angle of pendulum to coordinates
  let x = sin(angle) * radius;
  let y = cos(angle) * radius;
  
  // Draw pendulum string
  strokeWeight(5);
  stroke(0);
  line(origin.x, origin.y, origin.x + x, origin.y + y);
  
  // Draw pendulum bob
  noStroke();
  fill(0);
  circle(origin.x + x, origin.y + y, 40);
  
  // Reset start time for next loop
  startTime = timeNow;
  
}

// Pendulum Object Class
class Pendulum {
  constructor(radius, origin, angle) {
    this.r = radius;
    this.anchor = origin;
    
    this.ang = angle;
    this.vel = 0;
    this.acc = 0;
  }
  
  // Euler approximation for angle of pendulum
  // Parameters: gravity constant and timestep
  applyForce(grav, time) {
    // Calculate angular accleration
    this.acc = grav * sin(this.ang) / this.r;
    // Adjust angular velocity
    let before = this.vel
    this.vel += this.acc * time;
    let after = this.vel
    if (before > 0 && after < 0 || before < 0 && after > 0) {
      console.log(abs(degrees(this.ang)));
    }
    // Adjust angle
    this.ang -= this.vel * time;
  }
  
  angle() {
    return this.ang;
  }
  
  radius() {
    return this.r;
  }
  
  origin() {
    return this.anchor;
  }
}
