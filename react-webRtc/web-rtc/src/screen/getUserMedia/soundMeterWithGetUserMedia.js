import React from 'react';

function SoundMeter(context) {

  this.context = context;
  this.instant = 0.0;
  this.slow = 0.0;
  this.clip = 0.0;
  this.script = context.createScriptProcessor(2048,1,1);
  const that = this;

  this.script.onaudioprocess = function(event) {
    const input = event.inputBuffer.getChannelData(0);
    let i;
    let sum = 0.0;
    let clipCount = 0;
    for (i = 0; i < input.length; ++i) {
      sum += input[i] * input[i];
      if (Math.abs(input[i]) > 0.99) {
        clipCount += 1;
      }
    }
    // console.log('sum=',sum,'inputArray=', input);
    that.instant = Math.sqrt(sum / input.length);
    that.slow = 0.95 * that.slow + 0.05 * that.instant;
    that.clip = clipCount / input.length;
  }
}

SoundMeter.prototype.connectToSource = function (stream, callback) {
  console.log('SoundMeter connecting');
  try {
    this.mic = this.context.createMediaStreamSource(stream);
    this.mic.connect(this.script);

    this.script.connect(this.context.destination);

    if(typeof callback !== 'undefined') {
      callback(null);
    }
  } catch(e) {
    console.error('error in connectToSource', e);
    if(typeof callback !== 'undefined') {
      callback(e);
    }
  }
}

SoundMeter.prototype.stop = () => {
  this.mic.disconnect();
  this.script.disconnect();
}

function main() {
  const instantMeter = document.querySelector('#instant meter');
  const slowMeter = document.querySelector('#slow meter');
  const clipMeter = document.querySelector('#clip meter');

  const instatValueDisplay = document.querySelector('#instant .value');
  const slowValueDisplay = document.querySelector('#slow .value');
  const clipValueDisplay = document.querySelector('#clip .value');

  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.audioContext = new AudioContext();
  } catch(e) {
    alert('Wen Audio api not supported');
  }

  const constraints = window.constraints = {
    audio: true,
    video: false
  }

  function handlerSuccess(stream) {
    window.stream = stream;
    const soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
    soundMeter.connectToSource(stream, function(e) {
      if(e) {
        alert(e);
        return;
      }
      setInterval(() => {
        console.log(soundMeter.instant);
        instantMeter.value = instatValueDisplay.innerText = soundMeter.instant.toFixed(2);
        slowMeter.value = slowValueDisplay.innerText = soundMeter.slow.toFixed(2);
        clipMeter.value = clipValueDisplay.innerText = soundMeter.clip.toFixed(2);
      }, 200)
    })
  }
  navigator.getUserMedia(constraints, (stream) => { handlerSuccess(stream) }, (err) => {console.error('error', err)})
}

class Index extends React.Component {

  state={};

  componentDidMount() {
    main();
  }

  render() {
    return (
      <div>
        <p>Measure the volume of a local media stream using WebAudio.</p>
        <div id="meters">
        <div id="instant">
            <div className="label">Instant:</div>
            <meter high="0.25" max="1" value="0" style={{ width: '50%'}}></meter>
            <div className="value"></div>
        </div>
        <div id="slow">
            <div className="label">Slow:</div>
            <meter high="0.25" max="1" value="0" style={{ width: '50%'}}></meter>
            <div className="value"></div>
        </div>
        <div id="clip">
            <div className="label">Clip:</div>
            <meter max="1" value="0" style={{ width: '50%'}}></meter>
            <div className="value"></div>
        </div>
    </div>
      </div>
    )
  }
}
export default Index;
