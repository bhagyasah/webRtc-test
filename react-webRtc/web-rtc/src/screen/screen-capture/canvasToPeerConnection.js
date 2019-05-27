import React from 'react';
import ImageSrc from '../../testImage.png';

function main() {
  const canvas = document.querySelector('canvas');
  const video = document.querySelector('video');
  const ImageTest = new Image();
  ImageTest.src = ImageSrc;
  ImageTest.onload = () => {
    canvas.getContext('2d').drawImage(ImageTest, 0, 0);
  }

let stream = canvas.captureStream(30);
let pc1;
let pc2;

const offerOptions = {
  offerToRecieveAudio: 1,
  offerToRecieveVideo: 1
}

call();

function call() {
  console.log('Starting call');
  // startTime = window.performance.now();
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
  stream.getTracks().forEach(track => pc1.addTrack(track, stream));
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
  console.log('GOT ROMOTE STREAM', event);
  if (video.srcObject !== event.streams[0]) {
    video.srcObject = event.streams[0];
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
        <canvas></canvas>
        <video playsInline controls  muted style={{ height: 600, width: 700, margin: 50, background: 'yellow' }}>
        </video>
        {/* <video id="rightVideo" playsInline autoPlay style={{ height: 400, width: 500, background: 'red' }}></video> */}
      </div>
    )
  }
}
export default Index;