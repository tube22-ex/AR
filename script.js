const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const UserMediaBtn = document.getElementById('UserMediaBtn');
const controlPanel = document.getElementById('controlPanel');
const ctx = canvas.getContext('2d');

let videoW = 0;
const constraints = {
    video: { 
      facingMode: 'environment',
      frameRate: 60,
    },
    audio: false
  };

function media(){
  navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        const videoTrack = stream.getVideoTracks()[0];

        const constraints = {
          width: {
            ideal: 1920,
            //ideal: 3840,     // 希望する幅
            min: 1920        // 最小値として指定
          },
          height: {
            ideal : 1080,
            //ideal: 2160,      // 希望する高さ
            min: 1080         // 最小値として指定
          }
        };
    
        videoTrack.applyConstraints(constraints)
          .then(() => {
            video.srcObject = stream;

            video.addEventListener('loadedmetadata', () => {
              canvas.height = video.videoHeight;
              videoW = video.videoWidth;
              canvas.width = videoW * 2; 
            });
            video.addEventListener('play',videodraw);
          })
  })
}

UserMediaBtn.addEventListener('click',()=>{
  ctrlDisplayNone();
  media();
})

function ctrlDisplayNone(){
  controlPanel.style.display = 'none';
}

function videodraw(){
  const draw = () => {
    if (video.paused || video.ended) {
      return;
    }
    ctx.drawImage(video, 0, 0, videoW, canvas.height);
    ctx.drawImage(video, videoW + 1, 0, videoW, canvas.height);

    requestAnimationFrame(draw);
  };

  draw();
}

let localStream;
const st_option = {
  video: { 
    frameRate: 60,
  },
  audio: {
      sampleRate: 44100
  }
}
document.getElementById('btn00').onclick = () => {

navigator.mediaDevices.getDisplayMedia(st_option)
  .then( stream => {
  video.srcObject = stream;
  video.play();
  localStream = stream;
  document.getElementById('shareID').textContent = "接続ID: " + peer.id;
  let mv = document.getElementById('myV')
  mv.setAttribute("playsinline",'')
  mv.setAttribute("controls",'')
})

}
const peer = new Peer({key: 'b2ec5df0-85b1-4e32-965f-072a7379a325'});

document.getElementById('btn').onclick = () => {

  let idv = document.getElementById('ID').value;
  const ID = idv.replace(' ','');
  const dataConnection = peer.connect(ID);
  const mediaConnection = peer.call(ID, localStream);
    setEventListener(mediaConnection);
  alert(ID + "に接続")
  // ctrlDisplayNone();
};

//映像
  // 相手側のやつ
  const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
      video.srcObject = stream;
      video.play();
      video.addEventListener('loadedmetadata', () => {
        canvas.height = video.videoHeight;
        videoW = video.videoWidth;
        canvas.width = videoW * 2; 
        console.log(canvas.height,videoW,canvas.width)
        videodraw()
      });

    });
  }

peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream);
    setEventListener(mediaConnection);
});
