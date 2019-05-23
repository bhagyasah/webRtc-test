import React from 'react';

class GetUserMediaAudioOnly extends React.Component {

  state={};

  componentDidMount() {
    const audio = window.audio = document.querySelector('audio');
    navigator.getUserMedia({video: false, audio: true }, (stream) => {
      audio.srcObject = stream;
    }, (err) => {
      console.error('error', err)
    })
  }

  render() {
    return (
      <audio autoPlay controls></audio>
    )
  }
}
export default GetUserMediaAudioOnly;
