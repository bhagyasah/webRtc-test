import React from 'react';
import BasicGetUserMedia from './getUserMedia/basicGetUserMediaDemo';
import GetUserMediaWidthConvas from './getUserMedia/getUserMediaWithConvas';
import GetUserMediaWithCssFilter from './getUserMedia/getUserMediaWithCssFilter';
import GetUserMediaWithDifferentDimensitons from './getUserMedia/getUserMediaWithDynamicResolution';
import GetUserMediaOnlyAudio from './getUserMedia/getUserMediaAudioOnly';

class Index extends React.Component {

  state = {};

  render() {
    return (
      <div>
        {/* <BasicGetUserMedia /> */}
        {/* <GetUserMediaWidthConvas /> */}
        {/* <GetUserMediaWithCssFilter /> */}
        {/* <GetUserMediaWithDifferentDimensitons /> */}
        <GetUserMediaOnlyAudio />
      </div>
    )
  }
}

export default Index;