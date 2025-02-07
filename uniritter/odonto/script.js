const video = document.getElementById('video')
const startScreen = document.getElementById('start-screen')
const startBtn = document.getElementById('start-btn')
const backToStartBtn = document.getElementsByClassName('back-to-start')
const resultText = document.getElementById('result')
const endScreen = document.getElementById('end-screen')
const photo = document.getElementById('photo-final')
const flash = document.getElementById('flash')

let state = 0
let felicidade = 0
let factor = 0.6;

function handleOrientation() {
  if (screen.orientation.type.includes("portrait")) {
    factor = 1;
  } else {
    factor = 0.6;
  }
}

handleOrientation()

video.setAttribute('width', window.innerWidth*0.8*factor)
video.setAttribute('height', window.innerWidth*0.6*factor)

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

function startVideo() {
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: true})
    .then(stream => video.srcObject = stream)
    .catch(err => console.error(err))
}

startBtn.addEventListener('click', () => {
  state = 1
  startScreen.style.display = "none"
})

for (let i = 0; i < backToStartBtn.length; i++) {
  backToStartBtn[i].addEventListener('click', () => {
    state = 0
    startScreen.style.display = "block"
    backToStartBtn[0].style.display = "block";
    endScreen.style.display = "none"
    flash.style.opacity = "1"
    flash.style.width = "0%"
  })  
}

video.addEventListener('loadedmetadata', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  const context = canvas.getContext("2d");
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)

    const happyPercentage = detections[0].expressions.happy
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    
    if (happyPercentage >= 0.90 && happyPercentage <= 1 && state == 1) {
      felicidade += 1
      video.style.border = "solid " + (felicidade / 2) + "px rgb(255, 230, 250)"
      video.style.boxShadow = "0px 0px " + (felicidade * 5) + "px rgba(250, 200, 220, 0.9)"
      resultText.innerText = "Sorriso detectado.\nLiberando seu estacionamento..."

      // resizedDetections.forEach(({ landmarks }) => {
      //   drawLandmarks(context, landmarks, 'rgb(255, 180, 230)', 2);
      // });

    } else {
      felicidade = 0
      video.style.border = "solid 0 rgb(220, 100, 180)"
      video.style.boxShadow = "0px 0px 15px rgba(10, 10, 10, 0.9)"
      resultText.innerText = "Sorria e libere o seu\nestacionamento."
    }


    // resizedDetections.forEach(({ landmarks }) => {
    //   drawLandmarks(context, landmarks, 'rgb(255, 230, 130)', 2);
    // });

    if (felicidade > 20) {
      state = 2
      flash.style.opacity = "0"
      flash.style.width = "100%"
      
      context.drawImage(video, 0, 0, video.width, video.height);
      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
      backToStartBtn[0].style.display = "none";
      endScreen.style.display = "block";
      
      // Download da foto tirada
      // var dl = document.createElement("a");
      // dl.href = data;
      // dl.download = 'sorriso.jpg';
      // document.body.appendChild(dl);
      // dl.click();

    }

    //console.log(landmarks, felicidade)
    //faceapi.draw.drawDetections(canvas, resizedDetections)
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})

function drawLandmarks(ctx, landmarks, color = 'red', lineWidth = 1) {
  const regions = [
    // landmarks.getJawOutline(),
    // landmarks.getLeftEye(),
    // landmarks.getRightEye(),
    // landmarks.getLeftEyeBrow(),
    // landmarks.getRightEyeBrow(),
    // landmarks.getNose(),
    landmarks.getMouth()
  ];

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  regions.forEach(region => {
    ctx.beginPath();
    for (let i = 0; i < region.length; i++) {
      const point = region[i];
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
    ctx.closePath();
    ctx.stroke();
  });
}