import React from 'react';
import ImageSrc from '../../testImage.png';

class Index extends React.Component {
  state = {};

  componentDidMount() {
    const canvas = document.querySelector('canvas');
    const video = document.querySelector('video');
    const ImageTest = new Image();
    ImageTest.src = ImageSrc;
    ImageTest.onload = () => {
      canvas.getContext('2d').drawImage(ImageTest, 0, 0);
    }
    const stream = canvas.captureStream();
    video.srcObject = stream;
  }

  render() {
    return (
      <div>
        <canvas style={{ width: 400, height: 400, background: '#757575' }}></canvas>
        <video playsInline autoPlay style={{ background: 'black', width: 500, height: 400, margin: 50}}></video>
      </div>
    )
  }
}
export default Index;