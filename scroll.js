var contatext = 'ME CONTE SOBRE';
var textadd = [' SEU PROJETO', ' SUA IDEIA', ' SUA MARCA', ' SEU DESAFIO'];

var startWrite = false;
var writeState = 0;
var charState = 0;

var contatextElement = document.querySelector('#contatext');
var bioElements = document.querySelectorAll('.bio');

var isInViewport = (element) => {
  var rect = element.getBoundingClientRect();
  var position = rect.top / window.innerHeight;
  if (position >= 0 && position <= 1) {
    return true;
  }
  else {
    return false;
  }
}

// Function to check target element's position
var checkTargetPosition = (element) => {
  // get bounding client rect from element
  var rect = element.getBoundingClientRect();
  // grab measurements and percentage conversion
  var fromTop = rect.top;
  var fraction = rect.top / window.innerHeight;
  var percentage = fraction * 100;

  return percentage;
}

function ContactTitleTypewrite (){
  if (charState < (contatext + textadd[writeState]).length) {
    contatextElement.innerHTML += (contatext + textadd[writeState]).charAt(charState);
    charState++;
    setTimeout(ContactTitleTypewrite, 100);
  }
}


// Listen for scroll event and check position
window.addEventListener('scroll', () => {

  // Contact Title Typewrite
  
  if (!startWrite && checkTargetPosition(contatextElement) < 100) {
    startWrite = true;
    ContactTitleTypewrite();
  }

  // Bio Paragraph Enphasis

  bioElements.forEach(bioElement => {

    let percentage = checkTargetPosition(bioElement);

    if (percentage > -20 && percentage < 70) {
      bioElement.classList.add('biofocus');
    } else {
      bioElement.classList.remove('biofocus');
    }
  });

});