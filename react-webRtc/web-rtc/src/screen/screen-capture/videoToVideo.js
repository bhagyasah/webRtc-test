import React from 'react';
import videoUrl from '../video/test.webm';

function main() {

const leftVideo = document.getElementById('leftVideo');
const rightVideo = document.getElementById('rightVideo');

leftVideo.addEventListener('canplay', () => {
  const stream = leftVideo.captureStream();
  rightVideo.srcObject = stream;

})

}

class Index extends React.Component {
  state={};

  componentDidMount() {
    main();
  }

  render() {
    return (
      <div>
        <video id="leftVideo" playsInline controls loop muted style={{ height: 600, width: 700, margin: 50, background: 'yellow' }}>
        <source src={videoUrl} type="video/webm"/>
        </video>
        <video id="rightVideo" playsInline autoPlay style={{ height: 400, width: 500, background: 'red' }}></video>
      </div>
    )
  }
}

export default Index;
