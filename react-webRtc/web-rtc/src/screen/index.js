import React from 'react';
import BasicGetUserMedia from './getUserMedia/basicGetUserMediaDemo';
import GetUserMediaWidthConvas from './getUserMedia/getUserMediaWithConvas';
import GetUserMediaWithCssFilter from './getUserMedia/getUserMediaWithCssFilter';


class Index extends React.Component {

  state = {};

  render() {
    return (
      <div>
        {/* <BasicGetUserMedia /> */}
        {/* <GetUserMediaWidthConvas /> */}
        <GetUserMediaWithCssFilter />
      </div>
    )
  }
}

export default Index;