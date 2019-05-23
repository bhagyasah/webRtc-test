import React from 'react';

const constraints = window.constraints = {
  audio: false,
  video: {width: {exact: 320}, height: {exact: 240}} // just provide the exact height and width for different resuloution
};


class Index extends React.Component {

  state = {};

  componentDidMount() {
    navigator.getUserMedia(constraints, (stream) => {
      const video = document.querySelector('video');
      video.srcObject = stream;
    }, (err) => console.error(err))
  }

  render() {
    return (
      <div>
        <video autoPlay controls></video>
      </div>
    )
  }
}

export default Index;