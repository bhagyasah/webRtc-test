import React from 'react';


function main() {
  const videoElement = document.querySelector('video');
  const audioInputSelect = document.querySelector('select#audioSource');
  const audioOutputSelect = document.querySelector('select#audioOutput');
  const videoSelect = document.querySelector('select#videoSource');
  const selectors = [audioInputSelect, audioOutputSelect, videoSelect];

  // console.log(('sinkId' in HTMLMediaElement.prototype));
  audioOutputSelect.disable = !('sinkId' in HTMLMediaElement.prototype);

  function gotDevices(deviceInfos) {
    console.log(deviceInfos);
    const values = selectors.map(select => select.values);
    selectors.forEach(select => {
      while(select.firstChild) {
        select.removeChild(select.firstChild);
      }
    });
    for(let i = 0; i !== deviceInfos.length; i+= 1) {
      const deviceInfo = deviceInfos[i];
      const option = document.createElement('option');
      option.value = deviceInfo.deviceId;

      if(deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
        audioInputSelect.appendChild(option);
      } else if(deviceInfo.kind === 'audiooutput') {
        option.text = deviceInfo.label || `speaker ${audioOutputSelect.length + 1}`
        audioOutputSelect.appendChild(option);
      } else if(deviceInfo.kind === 'videoinput') {
        option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
        videoSelect.appendChild(option);
      } else {
        console.log( 'Some other kind of source/device:', deviceInfo);
      }
    }
    selectors.forEach((select, selectorIdx) => {
      if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIdx])) {
        select.value = values[selectorIdx];
      }
    })
  }

  navigator.mediaDevices.enumerateDevices().then(gotDevices).catch((e) => console.error(e));

  // Attach audio output device to video element using device/sink ID
  function attachSinkId(element, sinkId) {
    console.log( 'attach funt', element, sinkId);
    if (typeof element.sinkId !== 'undefined') {
      element.setSinkId(sinkId).then(() => {
        console.log(`Success, audio output device attached: ${sinkId}`)
      }).catch(e => {
        let errorMessage = e;
        if (e.name === 'SecurityError') {
          errorMessage =  `You need to use HTTPS for selecting audio output device: ${e}`
        }
        console.error(errorMessage);
        // jump back to first output device in the list as its the default
        audioOutputSelect.selectedIndex = 0;
      });
    } else {
      console.warn('Browser does not suport output device selection');
    }
  }

  function changeAudioDestination() {
    const audioDestination = audioOutputSelect.value;
    attachSinkId(videoElement, audioDestination);
  }

  function gotStream(stream) {
    window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  }

  function start() {
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      })
    }

    const audioSource = audioInputSelect.value;
    const videoSource = videoSelect.value;
    const constraints = {
      audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
      video: {deviceId: videoSource ? {exact: videoSource} : undefined}
    };
    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(e => console.error(e));
  }

  audioInputSelect.onchange = start;
  audioOutputSelect.onchange = changeAudioDestination;
  videoSelect.onchange = start;
  start();
}

class Index extends React.Component {
  state={};

  componentDidMount() {
    main();
  }

  render() {
    return(
      <div>
        {/* <h1><a href="//webrtc.github.io/samples/" title="WebRTC samples homepage">WebRTC samples</a><span>Select sources &amp; outputs</span></h1> */}
        <p>Get available audio, video sources and audio output devices from <code>mediaDevices.enumerateDevices()</code>
        then set the source for <code>getUserMedia()</code> using a <code>deviceId</code> constraint.
        </p>
        <div className="select">
          <label for="audioSource">Audio input source: </label><select id="audioSource"></select>
        </div>
        <div className="select">
            <label for="audioOutput">Audio output destination: </label><select id="audioOutput"></select>
        </div>
        <div className="select">
            <label for="videoSource">Video source: </label><select id="videoSource"></select>
        </div>
        <video id="video" playsInline autoPlay></video>
      </div>
    )
  }
}
export default Index;