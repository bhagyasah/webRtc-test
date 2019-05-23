import React from 'react';

class GetUserMediaWithConvas extends React.Component{
  state = {};

  componentDidMount() {
    const video = document.querySelector('video');
    const canvas = window.canvas = document.querySelector('canvas');
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
  }

  render() {
    return (
      <div>
        <video autoPlay></video>
        <button>Take snapshot</button>
        <canvas></canvas>
      </div>
    )
  }
}

export default GetUserMediaWithConvas;