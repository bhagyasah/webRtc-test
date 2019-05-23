function hasUserMedia() {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
     || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  return navigator.getUserMedia;
}
console.log(hasUserMedia());
if (true) {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
     || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  //get both video and audio streams from user's camera
  navigator.getUserMedia({ video: true, audio: false }, function (stream) {
     var video = document.querySelector('video');

     //insert stream into the video tag
    //  video.src = window.URL.createObjectURL(stream);
      console.log(stream);
     video.srcObject = stream;
  }, function (err) {});

  let peerConn = new RTCPeerConnection();
  let dataCannel = peerConn.createDataChannel('myChanel');
  console.log(dataCannel);
} else {
  alert("Error. WebRTC is not supported!");
}