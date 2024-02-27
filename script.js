const video = document.getElementById('video');
const startBtn = document.getElementById('startBtn');
const switchBtn = document.getElementById('switchBtn');

let currentStream;

startBtn.addEventListener('click', startCamera);
switchBtn.addEventListener('click', switchCamera);

async function startCamera() {
    const constraints = {
      video: { facingMode: 'environment' },
      audio: false
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    currentStream = stream;
}

async function switchCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');

    if (videoDevices.length > 1) {
      const currentDeviceId = currentStream.getVideoTracks()[0].getSettings().deviceId;
      const nextDevice = videoDevices.find(device => device.deviceId !== currentDeviceId);

      const constraints = {
        video: { deviceId: { exact: nextDevice.deviceId } },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
      currentStream = stream;
    } 

}


let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {

    player = new YT.Player('player', {
        width: '640', //幅
        height: '360',
        videoId: '',//テスト用 f1xNyfpNlTM
        playerVars: {
            enablejsapi: 1,
            disablekb: 1,
            rel: 0,
            origin: location.protocol + '//' + location.hostname + "/"
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        }
    });

}
//Youtube playerAPI

function onPlayerReady() {
    //player.setVolume(videoVolume)
    video_set('GPKPjEnHvl8')
}


function onPlayerStateChange(event) {

}

function video_set(videoID){
    player.cueVideoById(videoID);
}

