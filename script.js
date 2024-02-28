const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const constraints = {
    video: { facingMode: 'environment' },
    audio: false
  };

navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
        video.srcObject = stream;
        let videoW = 0;
        video.addEventListener('loadedmetadata', () => {
          canvas.height = video.videoHeight;
          videoW = video.videoWidth;
          canvas.width = videoW * 2; 
        });

        video.addEventListener('play', () => {
          const draw = () => {
            if (video.paused || video.ended) {
              return;
            }
            ctx.drawImage(video, 0, 0, videoW, canvas.height);
            ctx.drawImage(video, videoW + 1, 0, videoW, canvas.height);

            requestAnimationFrame(draw);
          };

          draw();
        });
      })
/*
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

*/