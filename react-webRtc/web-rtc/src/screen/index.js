import React from 'react';
import BasicGetUserMedia from './getUserMedia/basicGetUserMediaDemo';
import GetUserMediaWidthConvas from './getUserMedia/getUserMediaWithConvas';
import GetUserMediaWithCssFilter from './getUserMedia/getUserMediaWithCssFilter';
import GetUserMediaWithDifferentDimensitons from './getUserMedia/getUserMediaWithDynamicResolution';


class Index extends React.Component {

  state = {};

  render() {
    return (
      <div>
        {/* <BasicGetUserMedia /> */}
        {/* <GetUserMediaWidthConvas /> */}
        {/* <GetUserMediaWithCssFilter /> */}
        <GetUserMediaWithDifferentDimensitons />
      </div>
    )
  }
}

export default Index;