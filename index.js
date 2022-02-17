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
let gravity = -3.5;

let orange = 'rgb(250,142,42)';
let light = 'rgb(202,202,202)';
let dark = 'rgb(10,10,10)';

let firecolor = '250,142,42';
let angle = 0;
let r = 0;

let BGalpha = 0.0;
let BGred = 0;
let BGgreen = 0;
let BGblue = 0;

var root = document.querySelector(':root');
let fireFactor = 50;

const sobreContainer = $('#sobre-section');
const projContainer = $('#proj-section');
const cttContainer = $('#contato-section');
var darkMode = true;

const sobreNav = $('#nav-sobre');
const projNav = $('#nav-proj');
const cttNav = $('#nav-ctt');
const moonBtn = $('#nav-moon');
const sunBtn = $('#nav-sun');

const sections = [sobreNav, projNav, cttNav];
const containers = [sobreContainer, projContainer, cttContainer];

sections.forEach((section, i) => {
  section.onclick = () => {
    containers[i].classList.toggle('show-block');
  }
});

moonBtn.onclick = e => {
    darkMode = true;
    themeUpdate();
}
sunBtn.onclick = e => {
    darkMode = false;
    themeUpdate();
}

function themeUpdate() {
  if (darkMode) {
    root.style.setProperty('--main-color', orange);
    root.style.setProperty('--text-color', light);
    root.style.setProperty('--bg-color', dark);
    root.style.setProperty('--shadow-color', 'rgb(2,2,2)');
    root.style.setProperty('--grad-color', 'rgb(51,33,15)');
  } else {
    root.style.setProperty('--main-color', orange);
    root.style.setProperty('--text-color', dark);
    root.style.setProperty('--bg-color', light);
    root.style.setProperty('--shadow-color', 'rgb(18,18,18)');
    root.style.setProperty('--grad-color', 'rgb(243 212 181)');
  }
}

const tracker = {
  x: null,
  y: null
}
// - Mouse Tracker
window.onmousemove = e => {
  tracker.x = e.x;
  tracker.y = e.y;
};
window.onmouseout = e => {
  tracker.x = undefined;
  tracker.y = undefined;
};

// mouse over effect
document.querySelectorAll('.nav-but').forEach((item, i) => {
  item.onmouseover = e => {
    if (darkMode) {
      firecolor = '242,242,242';
    } else {
      firecolor = '250,142,42';
    }
    fireFactor = 10;
    r = 1;
  }
  item.onmouseout = e => {
    if (darkMode) {
      firecolor = '250,142,42';
    } else {
      firecolor = '10,10,10';
    }
    fireFactor = 50;
    r = 0;
  }
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
    ctx.closePath();
  }

  update(t){
    //Particle lifetime
    this.size -= 0.15;
    this.weight -= 0.15;
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
    let c = 'rgb(250,142,42)';
    let w = 1;
    particleArray.push(new Particle(x, y, s, c, w));
  }
}

function animate(){
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
        opacity = .8 - (dist/fireFactor);
        ctx.strokeStyle = 'rgba('+firecolor+','+opacity+')';
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}
