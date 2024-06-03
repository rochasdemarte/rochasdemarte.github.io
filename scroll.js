var contatext = 'ME CONTE SOBRE';
var textadd = [' SEU PROJETO', ' SUA IDEIA', ' SUA MARCA', ' SEU DESAFIO'];

var startWrite = false;
var writeState = 0; // 0 = SEU PROJETO, 1 = SUA IDEIA, 2 = SUA MARCA, 3 = SEU DESAFIO
var totalWriteState = 0; // 0 = writing, 1 = waiting, 2 = erasing
var charState = 0;
var writingTime = 80;
var waitingTime = 800;

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

function ContactTitleTypewrite () {
  if (totalWriteState == 0){
    if (charState < (contatext + textadd[writeState]).length) {
      contatextElement.innerHTML += (contatext + textadd[writeState]).charAt(charState);
      charState++;
      setTimeout(ContactTitleTypewrite, writingTime);
    } else {
      totalWriteState = 1;
      setTimeout(ContactTitleTypewrite, waitingTime);
    }
  } else if (totalWriteState == 1) {
    totalWriteState = 2;
    setTimeout(ContactTitleTypewrite, writingTime);
  } else if (totalWriteState == 2){
    if (charState > contatext.length) {
      contatextElement.innerHTML = contatextElement.innerHTML.slice(0, -1);
      charState--;
      setTimeout(ContactTitleTypewrite, writingTime);
    } else {
      writeState = (writeState + 1) % textadd.length;
      totalWriteState = 0;
      setTimeout(ContactTitleTypewrite, writingTime);
    }
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