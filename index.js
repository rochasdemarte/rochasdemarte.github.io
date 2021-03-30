const $ = q => document.querySelector(q);

const sobreContainer = $('#sobre-section');

const sobreNav = $('#nav-sobre');
const projNav = $('#nav-proj');
const cttNav = $('#nav-ctt');

sobreNav.onclick = () => {
  sobreContainer.classList.toggle('show-block');
  
}
