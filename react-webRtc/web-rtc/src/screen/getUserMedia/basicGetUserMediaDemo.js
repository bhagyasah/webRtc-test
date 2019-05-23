import React from 'react';

const constraints = window.constraints = {
  audio: false,
  video: true
};


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