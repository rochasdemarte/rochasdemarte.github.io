const bar = $('.bar');
const AudioContext = window.AudioContext || window.webkitAudioContext;
const ac = new AudioContext();

function barSound() {
  let osc = ac.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = 30;
  //osc.frequency.exponentialRampToValueAtTime(37,ac.currentTime + 1);
  let gain = ac.createGain();
  gain.gain.exponentialRampToValueAtTime(0.01, ac.currentTime + .4)
  osc.start();
  osc.stop(ac.currentTime + .4);
  osc.connect(gain).connect(ac.destination);
}

if (ac.state === 'suspended') {
  ac.resume();
}

bar.onmouseover = e => {
  barSound();
}
document.onkeydown = e => {
  if (e.code == 'Space') {
    barSound();
  }
}
