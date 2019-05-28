import React from 'react';
import BasicGetUserMedia from './getUserMedia/basicGetUserMediaDemo';
import GetUserMediaWidthConvas from './getUserMedia/getUserMediaWithConvas';
import GetUserMediaWithCssFilter from './getUserMedia/getUserMediaWithCssFilter';
import GetUserMediaWithDifferentDimensitons from './getUserMedia/getUserMediaWithDynamicResolution';
import GetUserMediaOnlyAudio from './getUserMedia/getUserMediaAudioOnly';
import SoundMeterWithGetUserMedia from './getUserMedia/soundMeterWithGetUserMedia';
import MediaRecorder from './getUserMedia/mediaRecorder';
import ScreenSharing from './getUserMedia/screenSharing';
import ChooseCamraMicrophoneAndSpeaker from './devices/chooseCamraMicroPhoneAndSpeaker';
import VideoToVideoCaptcher from './screen-capture/videoToVideo';
import VideoToPeerConnection from './screen-capture/videoToPeerConnection';
import CanvasToVideo from './screen-capture/convasToVideo';
import CanvasToPeerConnection from './screen-capture/canvasToPeerConnection';
import CanvasRecord from './screen-capture/canvasRecord';
import BasicPeerConnectionDemo from './rtc-peer-connection/BasicDemo';
import UpgradeCallAndTurnonVideo from './rtc-peer-connection/upgradeCallAndTurnonVideo';
import MultiPeerConnectiosAtOnce from './rtc-peer-connection/multiPeerConnectionAtOnce';
import MultipleRelay from './rtc-peer-connection/multipleRelay';
import MungeSDP from './rtc-peer-connection/MungeSdp';

class Index extends React.Component {

  state = {};

  render() {
    return (
      <div>
        {/* <BasicGetUserMedia /> */}
        {/* <GetUserMediaWidthConvas /> */}
        {/* <GetUserMediaWithCssFilter /> */}
        {/* <GetUserMediaWithDifferentDimensitons /> */}
        {/* <GetUserMediaOnlyAudio /> */}
        {/* <SoundMeterWithGetUserMedia /> */}
        {/* <MediaRecorder /> */}
        {/* <ScreenSharing /> */}
        {/* <ChooseCamraMicrophoneAndSpeaker /> */}
        {/* <VideoToVideoCaptcher /> */}
        {/* <VideoToPeerConnection /> */}
        {/* <CanvasToVideo /> */}
        {/* <CanvasToPeerConnection /> */}
        {/* <CanvasRecord /> */}
        {/* <BasicPeerConnectionDemo /> */}
        {/* <UpgradeCallAndTurnonVideo /> */}
        {/* <MultiPeerConnectiosAtOnce /> */}
        {/* <MultipleRelay /> */}
        <MungeSDP />
      </div>
    )
  }
}

export default Index;