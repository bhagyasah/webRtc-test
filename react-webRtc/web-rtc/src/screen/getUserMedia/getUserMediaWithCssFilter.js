import React from 'react';

class GetUserMediaWithCssFilter extends React.Component {
  state = {};

  componentDidMount() {

    const snapshotButton = document.querySelector('button#snapshot');
    const filterSelect = document.querySelector('select#filter');

    const video = window.video = document.querySelector('video');
    const canvas = window.canvas = document.querySelector('canvas');
    canvas.width = 480;
    canvas.height = 360;

    snapshotButton.onclick = function() {
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <video autoPlay style={{ WebkitFilter: 'blur(3px)', filter: 'blur(3px)'}}></video> {/* just style the video and canvas dynamically*/}
        <div style={{ width: 150, marginBottom: 10}}>
        <select id='filter'>
        <option value="none">None</option>
        <option value="blur">Blur</option>
        <option value="invert">Invert</option>
        </select>
        </div>
        <div style={{ width: 150}}>
        <button id="snapshot">Take snapshot</button>
        <canvas style={{ filter: 'blur(3px)'}}></canvas>
        </div>
      </div>
    )
  }
}

export default GetUserMediaWithCssFilter;