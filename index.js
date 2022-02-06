const $ = q => document.querySelector(q);

// Canvas setup
const canvas = $('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle variables
let particleArray = [];
let particleNumber = 100;
let trackMode = 'mouse';
let gravity = -1.5;

let BGalpha = 0.0;
let BGred = 0;
let BGgreen = 0;
let BGblue = 0;

const sobreContainer = $('#sobre-section');
const projContainer = $('#proj-section');
const cttContainer = $('#contato-section');

const sobreNav = $('#nav-sobre');
const projNav = $('#nav-proj');
const cttNav = $('#nav-ctt');

const sections = [sobreNav, projNav, cttNav];
const containers = [sobreContainer, projContainer, cttContainer];

sections.forEach((section, i) => {
  section.onclick = () => {
    containers[i].classList.toggle('show-block');
  }
});


const tracker = {
  x: null,
  y: null
}
// - Mouse Tracker
window.addEventListener('mousemove', e => {
  tracker.x = e.x;
  tracker.y = e.y;
});
window.addEventListener('mouseout', e => {
  tracker.x = undefined;
  tracker.y = undefined;
});
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
  }

  update(t){
    //Particle lifetime
    this.size -= 0.15;
    // Reset Particle
    if (this.size < 0) {
      this.x = (t.x + ((Math.random() * 10) -5));
      this.y = (t.y + ((Math.random() * 10) -5));
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
    let c = 'white';
    let w = 1;
    particleArray.push(new Particle(x, y, s, c, w));
  }
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgba(${BGred}, ${BGgreen}, ${BGblue}, ${BGalpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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
      if (dist < 400){
        opacity = .8 - (dist/100);
        ctx.strokeStyle = 'rgb(241,241,241,'+opacity+')';
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}
