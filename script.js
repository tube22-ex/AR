const video = document.getElementById('video')
const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click',main)

function main(){
navigator.mediaDevices.getUserMedia({ video: { exact: "user" }, audio: false })
  .then((stream) => {
    video.srcObject = stream;
  })
}
