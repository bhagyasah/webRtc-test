import React from 'react';
import videoUrl from '../video/test.webm';

function main() {
const leftVideo = document.getElementById('leftVideo');
const rightVideo = document.getElementById('rightVideo');

let stream;

let pc1;
let pc2;

const offerOptions = {
  offerToRecieveAudio: 1,
  offerToRecieveVideo: 1
}

let startTime;

function maybeCreateStream() {
  if (stream) {
    return;
  }

  if (leftVideo.captureStream) {
    stream = leftVideo.captureStream();
    console.log('Capture stream from leftVideo with captureStream()', stream);
    call();
  } else if(leftVideo.mozCaptureStream) {
    stream = leftVideo.mozCaptureStream();
    console.log('Capture stream from left Video with mozCaptureStream()', stream);
    call();
  } else {
    console.log('captureStream() not supported');
  }
}

// video tag capture must be set up after video tracks are enumerated.
leftVideo.oncanplay = maybeCreateStream;

if (leftVideo.readyState >= 3) { // Have future data
// Video is already ready to play, call maybe CareateStream in case oncanplay
// fired before we registered the event handler
maybeCreateStream();
}
leftVideo.play();

rightVideo.onloadmetadata = () => {
  console.log(`Remote video videoWidth: ${this.videoWidth}px, videoHeight:${this.videoHeight}px`);
}

rightVideo.onresize = () => {
  console.log(`Remote video size change to ${rightVideo.videoWidth}*${rightVideo.videoHeight}`);
  // we ll use the first onresize callback as an indication that
  // video has started playing out.
  if (startTime) {
    const elapsedTime = window.performance.now() - startTime;
    console.log('Setup time: ' + elapsedTime.toFixed(3) + 'ms');
    startTime = null;
  }
};

function call() {
  console.log('Starting call');
  startTime = window.performance.now();
  const videoTracks = stream.getVideoTracks();
  const audioTracks = stream.getAudioTracks();
  if(videoTracks.length > 0) {
    console.log(`Using video device: ${videoTracks[0].label}`);
  }
  if(audioTracks.length > 0) {
    console.log(`Using audio device: ${audioTracks[0].label}`);
  }

  const servers = null;

  pc1 = new RTCPeerConnection(servers);
  console.log('Create local peer connection object pc1');
  pc1.onicecandidate = e => onIceCandidate(pc1, e);
  pc2 = new RTCPeerConnection(servers);
  console.log('Create remote peer connection object pc2');
  pc2.onicecandidate = e => onIceCandidate(pc2, e);
  pc1.oniceconnectionstatechange = e => onIceStateChange(pc1,e);
  pc2.oniceconnectionstatechange = e => onIceStateChange(pc2, e);
  pc2.ontrack = gotRemoteStream;
  console.log('tracks details', stream.getTracks())
  stream.getTracks().forEach(track => {
    if(track.kind === 'video' || track.kind === 'audio'){
      pc1.addTrack(track, stream)
    }
  });
  console.log('Added local stream to pc1');

  console.log('pc1 createOffer start');
  pc1.createOffer(onCreateOfferSuccess, onCreateSessionDescriptionError, offerOptions);
}

function onCreateSessionDescriptionError(err) {
  console.log(`Faild to create session description: ${err.toString()}`);
}

function onCreateOfferSuccess(desc) {
  console.log(`offer from pc1 ${desc.sdp}`);
  console.log('pc1 setLocationDescription start');
  pc1.setLocalDescription(desc, () => onSetLocalSuccess(pc1), onSetSessionDescriptionError);
  console.log('pc2 setRemoteDescription start');
  pc2.setRemoteDescription(desc, () => onSetRemoteSuccess(pc2), onSetSessionDescriptionError);
  console.log('pc2 createAnswer start');

  pc2.createAnswer(onCreateAnserSuccess, onCreateSessionDescriptionError);
}

function onSetLocalSuccess(pc) {
  console.log(`${getName(pc)} setLocalDescription complete`);
}

function onSetRemoteSuccess(pc) {
  console.log(`${getName(pc)} setRemoteDescription complete`);
}

function onSetSessionDescriptionError(err) {
  console.log(`faild to set session descriptio: ${err.toString()}`);
}

function gotRemoteStream(event) {
  if (rightVideo.srcObject !== event.streams[0]) {
    rightVideo.srcObject = event.streams[0];
    console.log('pc2 recieved remote stream', event);
  }
}

function onCreateAnserSuccess(desc) {
  console.log(`Answer from pc2: ${desc.sdp}`);
  console.log('pc2 setLocalDescription start');
  pc2.setLocalDescription(desc, () => onSetLocalSuccess(pc2), onSetSessionDescriptionError);
  console.log('pc1 setRemoteDesription start');
  pc1.setRemoteDescription(desc, () => onSetRemoteSuccess(pc1), onSetSessionDescriptionError);
}

function onIceCandidate(pc, event) {
  getOtherPc(pc).addIceCandidate(event.candidate)
  .then(
    () => onAddIceCandidateSuccess(pc),
    err => onAddIceCandidateError(pc, err)
  );
  console.log(`${getName(pc)} ICE candidate: ${event.candidate ? event.candidate : 'null()'}`);
}

function onAddIceCandidateSuccess(pc) {
  console.log(`${getName(pc)} add Candidate success`);
}

function onAddIceCandidateError(pc, err) {
  console.log(`${getName(pc)} Faild to add ICE candidate: ${err.toString()}`);
}

function onIceStateChange(pc, event) {
  if(pc) {
    console.log(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
    console.log(`ICE state change event: ${event}`);
  }
}

function getName(pc) {
  return (pc === pc1) ? 'pc1' : 'pc2';
}

function getOtherPc(pc) {
  return (pc === pc1) ? pc2 : pc1;
}

}

class Index extends React.Component {
  state={};

  componentDidMount() {
    main();
  }

  render() {
    return(
      <div>
        <video id="leftVideo" playsInline controls loop muted style={{ height: 600, width: 700, margin: 50, background: 'yellow' }}>
        <source src={videoUrl} type="video/webm"/>
        </video>
        <video id="rightVideo" playsInline autoPlay style={{ height: 400, width: 500, background: 'red' }}></video>
      </div>
    )
  }
}
export default Index;
