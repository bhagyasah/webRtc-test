import React from 'react';
import ImageSrc from '../../testImage.png';

function recordCanvas() {

  const mediaSource = new MediaSource();
  mediaSource.addEventListener('sourceopen', handleSourceOpen, false);

  let mediaRecorder;
  let recordedBlobs;
  let sourceBuffer;


const errorMsgElement = document.querySelector('span#errorMsg');
const canvas = document.querySelector('canvas');

const recordedVideo = document.querySelector('video#recorded');
const recordButton = document.querySelector('button#record');

const ImageTest = new Image();
    ImageTest.src = ImageSrc;
    ImageTest.onload = () => {
      canvas.getContext('2d').drawImage(ImageTest, 0, 0);
    }

recordButton.addEventListener('click', () => {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording'
    playButton.disabled = false;
    downloadButton.disabled = false;
  }
})

const playButton = document.querySelector('button#play');
playButton.addEventListener('click', () => {
  const superBuffer = new Blob(recordedBlobs,{type: 'video/webm'});
  recordedVideo.src = null;
  recordedVideo.srcObject = null;
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
  recordedVideo.controls = true;
  recordedVideo.play();
});

const downloadButton = document.querySelector('button#download');
downloadButton.addEventListener('click', () => {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
})

function handleSourceOpen(event) {
  console.log('Media Source open');
  sourceBuffer = mediaSource.addSourceBuffer(`video/webm'; codecs="vp8"`)
  console.log('Source buffer', sourceBuffer);
}

function handleDataAvailable(event) {
  if(event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function startRecording() {
  recordedBlobs = [];
  let options = {mimeType: `video/webm';codecs=vp9`}
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.error(`${options.mimeType} is not supported`);
    errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
    options = {mimeType : `video/webm;codecs=vp8`}

    if(!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not supported`);
      errorMsgElement.innerHTML = `${options.mimeType} is not Supported`;
      options={mimeType: `video/webm`}
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        errorMsgElement.innerHTML = `${options.mimeType} is not supported`;
        options={mimeType: ''}
      }
    }
  }

  try {
    mediaRecorder = new MediaRecorder(window.stream, options)
  } catch (e) {
    errorMsgElement.innerHTML = `Execption while creating MediaRecorder: ${JSON.stringify(e)}`
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with option', options);
  recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped', event);
  }
  mediaRecorder.ondataavailable=handleDataAvailable;
  mediaRecorder.start(10);
  console.log('MediaRecoder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Recored Blobs:', recordedBlobs);
}

function handleSuccess(stream) {
  recordButton.disabled = false;
  console.log('getUserMedia got stream', stream);
  window.stream = stream;
  // const gumVideo = document.querySelector('video#gum');
  // gumVideo.srcObject = stream;
}

async function init(Constraints) {

    const stream = await canvas.captureStream(30);
    handleSuccess(stream);

}


const startButton = document.querySelector('button#start');

startButton.addEventListener('click', async () => {
const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
const Constraints = {
  audio: {
    echoCancellation: {exact: hasEchoCancellation}
  },
  video: { width: 400, height: 300 }
}
await init(Constraints);
})
}

class MediaRecorderT extends React.Component {
  state={};

  componentDidMount() {
    recordCanvas();
  }

  render() {
    return (
      <div>
        <video id="gum" playsInline autoPlay muted></video>
        <canvas style={{ width: 400, height: 400, background: '#757575' }}></canvas>
        <video id="recorded" playsInline loop></video>

        <div>
            <button id="start">Start camera</button>
            <button id="record" disabled>Start Recording</button>
            <button id="play" disabled>Play</button>
            <button id="download" disabled>Download</button>
        </div>

        <div>
            <h4>Media Stream Constraints options</h4>
            <p>Echo cancellation: <input type="checkbox" id="echoCancellation"/></p>
        </div>

    <div>
        <span id="errorMsg"></span>
    </div>
      </div>
    )
  }
}
export default MediaRecorderT;
