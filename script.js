
// Navigation Bar Section

const $ = x => document.querySelector(x);
let state = 0;

function handleNav() {
    $('.nav-mobile').classList.toggle("change");
    $('nav').classList.toggle("show-mobile");
    state = !state;
    if (state) {
        $('ul').style.height = '100%';
        $('header').style.height = '100%';
    } else {
        $('ul').style.height = '0';
        $('header').style.height = '0';
    }
}

$('.nav-mobile').onclick = x => {
    handleNav();
}

document.querySelectorAll('.nav-btn').forEach( e => {
    e.onclick = x => {
        if (window.innerWidth <= 800) handleNav();
    }
});

// Theme Section Dark and Light Mode Settings

var root = document.querySelector(':root');

const moonBtn = $('#nav-moon');
const sunBtn = $('#nav-sun');

let orange = getComputedStyle(root).getPropertyValue('--high-text');
let light = getComputedStyle(root).getPropertyValue('--low-text');
let dark = getComputedStyle(root).getPropertyValue('--bg');

var darkMode = true;

// var darkMode = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false;

// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
//     darkMode = event.matches ? true : false;
//     themeUpdate();
// });


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
    root.style.setProperty('--low-text', light);
    root.style.setProperty('--bg', dark);
  } else {
    root.style.setProperty('--low-text', dark);
    root.style.setProperty('--bg', light);
  }
}

themeUpdate();

let titleHome = document.querySelector('.hero-container h1');
let subtitleHome = document.querySelector('#soon p');
let navBtns = document.querySelectorAll('.nav-btn');

document.querySelectorAll('.color-btn').forEach(element => {
    
    let colorTimer;
    
    element.addEventListener('mouseover', () => {
        document.querySelector('#canvas').style.display = 'block';
        titleHome.style.setProperty('color', 'var(--high-text)');
        subtitleHome.style.setProperty('color', 'var(--high-text)');
        navBtns.forEach(el => {
            el.style.setProperty('color', 'var(--high-text)');
        });
        colorTimer = setInterval(() => {
            let high = + (orange.slice(4).split(',')[0]);
            orange = 'hsl(' + ((high + 3) % 360) + ', 40%, 52%)';
            root.style.setProperty('--high-text', orange);
        }, 1);
    });

    element.addEventListener('mouseout', () => {
        document.querySelector('#canvas').style.display = 'none';
        titleHome.style.setProperty('color', 'var(--low-text)');
        subtitleHome.style.setProperty('color', 'var(--low-text)');
        navBtns.forEach(el => {
            el.style.setProperty('color', 'var(--low-text)');
        });
        clearInterval(colorTimer);
        orange = 'hsl(10, 100%, 52%)';
        root.style.setProperty('--high-text', orange);
    });

}); 

// Project Settings Section

let projBtn = $('#signin-btn');

// Shuffle Array

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }