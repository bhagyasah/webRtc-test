import React from 'react';
import BasicGetUserMedia from './getUserMedia/basicGetUserMediaDemo';
import GetUserMediaWidthConvas from './getUserMedia/getUserMediaWithConvas';


class Index extends React.Component {

  state = {};

  render() {
    return (
      <div>
        {/* <BasicGetUserMedia /> */}
        <GetUserMediaWidthConvas />
      </div>
    )
  }
}

export default Index;