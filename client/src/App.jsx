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
        lat: Number,
        lng: Number,
      },
      marketCallBtn: 'inline',
      videoDisplay: 'none',
      video: '',
      markers: [],
    }
    this.makeAPICall = this.makeAPICall.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.showVideo = this.showVideo.bind(this);
    this.hideVideo = this.hideVideo.bind(this);
    this.getMarkers = this.getMarkers.bind(this);
  }
  componentDidMount() {
    this.getLocation();
    console.log(this.state)
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition((_position) => {
      // console.log(position.coords.latitude, position.coords.longitude);
      const lati = _position.coords.latitude;
      const long = _position.coords.longitude;
      this.setState({
        position:{
          lat: lati,
          lng: long,
        }
      });
    });
  }
  makeAPICall(latData, longData) {
    axios({
      method: 'post',
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000"
      },
      url: '/markers',
      data: {
        lat: latData,
        lng: longData,
      }
    })
    .then((response) => {
      console.log(response);
      this.setState({ markers: response.data.markers });
    })
    .catch(err => {
      console.log(err);
    });
  }
  showVideo(src) {
    // console.log('clicked');
    this.setState({ 
      videoDisplay: 'block',
    }, () => {
      this.setState({ video: <iframe title="video" style={{ display: this.state.videoDisplay, zIndex: '1000', position: 'absolute', top: '0px', width: '100%', height: '100%' }} src={src} width="500px"></iframe> })
    });
  }
  hideVideo(src) {
    this.setState({ 
      videoDisplay: 'none',
    }, () => {
      this.setState({ video: <iframe title="video" style={{ display: this.state.videoDisplay, zIndex: '1000', position: 'absolute', top: '0px', width: '100%', height: '100%' }} src={src} width="500px"></iframe> })
    });
  }
  getMarkers() {
    this.setState({ markerCallBtn: 'none'});
    this.makeAPICall(this.state.position.lat, this.state.position.lng);
  }
  // Post request needs user's location
  // response gets markers and video links

  render() {
    return (
      <div className="App">
        
        {/* <a onClick={this.getMarkers} className="btn" style={{display: this.state.markerCallBtn, zIndex: '2000', position: 'absolute', top: '45vh', left: '45vw', backgroundColor: 'white', color: 'red', border: '1px solid red', borderRadius: '5px' }}>Chisme</a>  */}
        <a onClick={this.hideVideo} className="btn" style={{ display: this.state.videoDisplay, zIndex: '1001', position: 'absolute', top: '0px', left: '0px', color: 'red' }}>X</a>
        {this.state.video}
        {/* <VideoPlayer /> */}
        <MapContainer getCenter={(lat, long) => {this.makeAPICall(lat, long)}} position={this.state.position} markers={this.state.markers} click={(src) => {this.showVideo(src)}} />
      </div>
    );
  }
}

export default App;