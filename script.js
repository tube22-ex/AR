const video = document.getElementById('video')
const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click',main)

function main(){
navigator.mediaDevices.getUserMedia({ video:  { facingMode: 'environment' },  audio: false })
  .then((stream) => {
    video.srcObject = stream;
  })
}
