import React from 'react';

class ScreenSharing extends React.Component {

  state={};

  async componentDidMount() {
    const video = document.querySelector('video');
    const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
    video.srcObject = stream;
  }

  render() {
    return (
      <div>
        <h1>Screensharing test</h1>
        <video autoPlay ></video>
      </div>
    )
  }
}
export default ScreenSharing;
