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