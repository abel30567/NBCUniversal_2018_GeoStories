import React, { Component } from 'react';
import axios from 'axios';
import VideoPlayer from './components/VideoPlayer';
import MapContainer from './components/MapContainer';

class App extends Component {
  makeAPICall() {
    axios.get('/some-endpoint').then(function(response) {
      console.log(response.data);
    });
  }

  render() {
    return (
      <div className="App">
        
        <VideoPlayer />
        <MapContainer />
      </div>
    );
  }
}

export default App;