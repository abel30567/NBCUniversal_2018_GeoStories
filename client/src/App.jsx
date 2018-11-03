import React, { Component } from 'react';
import axios from 'axios';
import VideoPlayer from './components/VideoPlayer';
import MapContainer from './components/MapContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Initial Center of Map
      position: {
        lat: 25.7737859,
        lng: -80.1899627,
      },
      seeVideo: false,
      closeVideo: false,
      videoDisplay: 'none',
    }
    this.makeAPICall = this.makeAPICall.bind(this);
    this.showVideo = this.showVideo.bind(this);
    this.hideVideo = this.hideVideo.bind(this);
  }
  makeAPICall() {
    axios.get('/some-endpoint').then(function(response) {
      console.log(response.data);
    });
  }
  showVideo() {
    // console.log('clicked');
    this.setState({ 
      seeVideo: true,
      videoDisplay: 'block',
    });
  }
  hideVideo() {
    this.setState({
      videoDisplay: 'none',
    })
  }
  // Post request needs user's location
  // response gets markers and video links

  render() {
    return (
      <div className="App">
        <a onClick={this.hideVideo} className="btn" style={{ display: this.state.videoDisplay, zIndex: '1001', position: 'absolute', top: '0px', left: '0px', color: 'red' }}>X</a>
        <iframe title="video" style={{ display: this.state.videoDisplay, zIndex: '1000', position: 'absolute', top: '0px' }} src="https://player.theplatform.com/p/0L7ZPC/D7AjRZyan6zo/embed/select/k80SJhYjr7UK" width="500px"></iframe>
        {/* <VideoPlayer /> */}
        <MapContainer click={() => {this.showVideo()}} />
      </div>
    );
  }
}

export default App;