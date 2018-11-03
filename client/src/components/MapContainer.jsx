/* eslint-disable no-unused-expressions */
/**
 * This component helps create an interactive Google Map Background
 *
 * CHECK: https://www.npmjs.com/package/google-maps-react
 */
import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Initial Center of Map
      position: {
        lat: 25.7737859,
        lng: -80.1899627,
      },
      
      // Initial Markers on Map
      markers: props.markers,
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
   this.setState({ markers: nextProps.markers })
  }
  /**
   * CHECK: https://www.npmjs.com/package/google-maps-react#onclick
   */
  onMarkerClick(props, map, event) {
    // console.log("Latitude: ", event.latLng.lat());
    // console.log("Longitude: ", event.latLng.lng());
    console.log(event, 'event');
    console.log(props, 'marker props')
    this.props.click();
    // console.log(this.props);
  }

  render() {
      
      const mapStuff = this.state.markers.map(marker => 
             ( <Marker
                key={marker.position.lat}
                position={marker.position}
                onClick={this.onMarkerClick}
              />)
          );
      
    

    return (
        // <iframe style={{ display: this.state.videoDisplay, position: 'absolute', top: '0px' }} src="https://player.theplatform.com/p/0L7ZPC/D7AjRZyan6zo/embed/select/k80SJhYjr7UK" width="500px"></iframe>
      <Map
        google={this.props.google}
        zoom={16}
        initialCenter={{
          lat: this.props.position.lat,
          lng: this.props.position.lng
        }}
        style={{ width: "100%", height: "100%", zIndex: '100' }}
      >
        {mapStuff}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA8BwpKOR2N1Orq_yrBYG9Isy2Vm3aKd-k"
})(MapContainer);

