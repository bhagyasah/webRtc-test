import React from 'react';

const constraints = window.constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  const video = document.querySelector('video');
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream;
  video.srcObject = stream;
}

class Index extends React.Component {

  state = {};

  componentDidMount() {
    navigator.getUserMedia({video: true, audio: false }, (stream) => {
      const video = document.querySelector('video');
      video.srcObject = stream;
    }, (err) => console.error(err))
  }

  render() {
    return (
      <div>
        <video autoPlay></video>
      </div>
    )
  }
}

export default Index;