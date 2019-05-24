import React from 'react';

class Index extends React.Component {

  state = {};

  componentDidMount() {
    navigator.getUserMedia({video: true }, (stream) => {
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