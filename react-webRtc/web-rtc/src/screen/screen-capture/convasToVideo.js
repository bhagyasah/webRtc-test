import React from 'react';
import ImageSrc from '../../testImage.png';

class Index extends React.Component {
  state={};

  componentDidMount() {
    const canvas = document.querySelector('canvas');
    const video = document.querySelector('video');
    const secondVideo = document.getElementById('secondVideo');
    const ctx = canvas.getContext("2d");

    const imageTest = document.getElementById('scream');
    ctx.drawImage(imageTest,0, 0, 150,150);

    canvas.width = 480;
    canvas.height = 360;
    const button = document.querySelector('button');

    button.onclick = function() {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    navigator.getUserMedia({video: true, audio: false}, (stream) => {
      video.srcObject = stream;
    }, (err) =>{})
    const stream = canvas.captureStream();
    secondVideo.srcObject = stream;
  }

  render() {
    return(
      <div>
        <img id="scream" width="220" height="277" src={ImageSrc} alt="The Scream"></img>
        <video playsInline autoPlay></video>
        <canvas  style={{ width: 400, height: 400, background: '#757575'}}></canvas>
        <video id="secondVideo" autoPlay></video>
        <button>test</button>
      </div>
    )
  }
}
export default Index;