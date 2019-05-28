import React from 'react';

function main() {




}

class Index extends React.Component{
  state={};

  componentDidMount() {
    main();
  }

  render() {
    return(
      <div>
        <div id="buttons">
          <button id="getMedia">Get media</button>
          <button id="createPeerConnection" disabled>Create peer connection</button>
          <button id="createOffer" disabled>Create offer</button>
          <button id="setOffer" disabled>Set offer</button>
          <button id="createAnswer" disabled>Create answer</button>
          <button id="setAnswer" disabled>Set answer</button>
          <button id="hangup" disabled>Hang up</button>
        </div>
          <div id="preview" style={{ display: 'flex', flexDirection: 'row'}}>
            <div id="local">
              <h2>Local</h2>
              <video playsInline autoPlay muted style={{ width: 300, height: 200, margin: 10 }}></video>
              <h2>Offer SDP</h2>
              <textarea></textarea>
              <br/>
              <br/>
            </div>
              <div id="remote">
                <h2>Remote</h2>
                <video playsInline autoPlay style={{ width: 300, height: 200, margin: 10 }}></video>
                <h2>Answer SDP</h2>
                <textarea></textarea>
              </div>
            </div>
        </div>
  )
  }
}
export default Index;
