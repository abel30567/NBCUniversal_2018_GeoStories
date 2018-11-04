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
    this.getCenter = this.getCenter.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
   this.setState({ markers: nextProps.markers })
   console.log(nextProps, 'next props');
  }
  /**
   * CHECK: https://www.npmjs.com/package/google-maps-react#onclick
   */
  getCenter(mapProps, map) {
    // console.log(mapProps, map);
    // console.log('latitude', map.center.lat());
    // console.log('longitude', map.center.lng());
    const lat = map.center.lat();
    const long = map.center.lng();
    this.props.getCenter(lat, long);
  }
  onMarkerClick(props, map, event) {
    // console.log("Latitude: ", event.latLng.lat());
    // console.log("Longitude: ", event.latLng.lng());
    // console.log(event, 'event');
    // console.log(props, 'marker props')
    // props.video gets you src
    this.props.click(props.video);
    // console.log(this.props);
  }

  render() {
      
      const mapStuff = this.state.markers.map(marker => 
             ( <Marker
                key={marker.position.lat}
                video={marker.url}
                position={marker.position}
                onClick={this.onMarkerClick}
              />)
          );
      
    

    return (
      <div style={{ width: '80vw', height: '80vh' }} className="col-xs-12">
        <Map
        google={this.props.google}
        zoom={16}
        onDragend={this.getCenter}
        initialCenter={{
          lat: this.props.position.lat,
          lng: this.props.position.lng
        }}
        style={{ width: "100%", height: "100%", zIndex: '100' }}
      >
        {mapStuff}
      </Map>
      </div>
      
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA8BwpKOR2N1Orq_yrBYG9Isy2Vm3aKd-k"
})(MapContainer);

