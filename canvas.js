// Canvas setup
const canvas = $('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle variables
let particleArray = [];
let particleNumber = 100;
let trackMode = 'mouse';
let gravity = -0.5;
const constGravity = gravity;

let firecolor = '8, 255, 90';
let angle = 0;
let r = 0;

let BGalpha = 0.0;
let BGred = 0;
let BGgreen = 0;
let BGblue = 0;

let fireFactor = 250;

const tracker = {
  x: null,
  y: null
}
// - Mouse Tracker
// window.onmousemove = e => {
//   tracker.x = e.x;
//   tracker.y = e.y;
// };
// window.onmouseout = e => {
//   tracker.x = undefined;
//   tracker.y = undefined;
// };

// mouse over effect
// document.querySelectorAll('.nav-btn').forEach((item, i) => {
//   item.onmouseover = e => {
//     if (darkMode) {
//       firecolor = '242,242,242';
//     } else {
//       firecolor = '8, 255, 90';
//     }
//     fireFactor = 10;
//     r = 1;
//   }
//   item.onmouseout = e => {
//     if (darkMode) {
//       firecolor = '8, 255, 90';
//     } else {
//       firecolor = '10,10,10';
//     }
//     fireFactor = 50;
//     r = 0;
//   }
// });

// Particles class
class Particle {
  constructor(x, y, size, color, weight){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.weight = weight;
  }

  draw(){
    // Draw particle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(t){
    //Particle lifetime
    this.size -= 0.05;
    this.weight -= 0.15;
    // Reset Particle
    if (this.size < 0) {
      this.x = (((Math.random() * window.innerWidth)));
      this.y = (((Math.random() * window.innerHeight)));
      this.size = (Math.random() * 4) + 2;
      this.weight = (Math.random() * 2) - 1;
    }
    // Particle on gravity
    this.y += ((this.weight + (this.size/3))/10) * gravity;
    this.weight += 0.2;
    // Particle bounce
    if(this.y > canvas.height - this.size){
      this.weight *= -1;
    }
  }
}

function init(){

  particleArray = [];
  for (let i = 0; i < particleNumber; i++){

    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let s = (Math.random() * 5) + 2;
    let c = 'rgb(250,142,42)';
    let w = .01;
    particleArray.push(new Particle(x, y, s, c, w));
  }
}

function animate(){
  // orange = rgb(255, 166, 61), rgb(255, 61, 119), rgb(51, 138, 255), rgb(60, 240, 197);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgba(${BGred}, ${BGgreen}, ${BGblue}, ${BGalpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  tracker.x += r * Math.sin(angle);
  tracker.y += r * Math.cos(angle);
  angle += 0.1;

  for (let i = 0; i < particleArray.length; i++){
    particleArray[i].update(tracker);
    //particleArray[i].draw(tracker);
  }
  link();
  requestAnimationFrame(animate);
}

init();
animate();
function link(){
  let opacity = 1.0;
  for (let a = 0; a < particleArray.length; a++){
    for (let b = a; b < particleArray.length; b++){
      let dist = Math.sqrt(((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x))
                           + ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y)));
      if (dist < fireFactor){
        opacity = .8 - (dist/fireFactor*2);
        let high = + (getComputedStyle(root).getPropertyValue('--high-text').slice(4).split(',')[0]);
        ctx.strokeStyle = 'hsla(' + ((high + 3) % 360) + ', 40%, 52%,'+opacity+')';
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}
