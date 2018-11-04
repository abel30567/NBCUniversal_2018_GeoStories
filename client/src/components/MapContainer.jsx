/* eslint-disable no-unused-expressions */
/**
 * This component helps create an interactive Google Map Background
 *
 * CHECK: https://www.npmjs.com/package/google-maps-react
 */
import React from "react";
import Popup from 'reactjs-popup';
import ReactDOM from 'react-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Initial Center of Map
      position: {
        lat: 25.7954910, 
        lng: -80.386,
      },
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      
      // Initial Markers on Map
      markers: props.markers,
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.getCenter = this.getCenter.bind(this);
    this.noVideo = this.noVideo.bind(this);
    this.streetView = this.streetView.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
   this.setState({ markers: nextProps.markers })
//    console.log(nextProps, 'next props');
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
    console.log(lat, long);
    // this.props.getCenter(lat, long);
  }

  onMarkerClick(props, marker, e) {
    console.log(props, 'props');
    const map = props.map;
    const google = props.google;
    const maps = google.maps;
    const moveLat = 25.798456503069705;
    const moveLong = -80.3881903576721;
    let center = new maps.LatLng(moveLat, moveLong);
    map.panTo(center)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  // onMarkerClickToo(props, map, event) {
  //   // console.log("Latitude: ", event.latLng.lat());
  //   // console.log("Longitude: ", event.latLng.lng());
  //   // console.log(event, 'event');
  //   // console.log(props, 'marker props')
  //   // props.video gets you src
  //   this.props.click(props.video);
  //   // console.log(this.props);
  // }

  noVideo() {
      this.props.noVideo();
  }

  showMagic() {

  }

  streetView() {
    console.log("Something happened");
    const node = ReactDOM.findDOMNode(this).parentNode;
    console.log(node);
    node.setAttribute('style', 'display:none');
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
      // const money = <Marker position={this.props.position} onClick={this.showMagic}/>;
      // const money = (<div><</div>);
    //   const money = (<Popup
    //   trigger= {<Marker position={this.props.position} />}
    //   open={true}
    //   position="top center"
    //   on="hover"
    // >
    //   <iframe width="560" height="315" src="https://www.youtube.com/embed/tK4W-V34DFo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    // </Popup>);


    

    return (
      <div style={{ width: '80vw', height: '80vh' }} className="col-xs-12">
        {/* <div className="col-xs-12">
        <iframe style={{ position: 'absolute', top: '50vh', left: '50vw', zIndex: '1500' }} width="10%" height="10%" src="https://www.youtube.com/embed/tK4W-V34DFo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div> */}
        
        <Map
        google={this.props.google}
        zoom={16}
        onDragend={this.getCenter}
        onClick={this.noVideo}
        initialCenter={{
          lat: this.props.position.lat,
          lng: this.props.position.lng
        }}
        style={{ width: "100%", height: "100%", zIndex: '100' }}
      >
        {mapStuff}
        <Marker 
          position={this.state.position} 
          onClick={this.onMarkerClick}
          name={'Current location'} 
          />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <iframe style={{ zIndex: '1500' }} width="300px" height="100%" src="https://www.youtube.com/embed/tK4W-V34DFo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <div style={{ width: '300px'}}>
                <h4 style={{ fontSize: '1rem' }}>Abre sus puertas la nueva sede de Telemundo en Miami | Noticiero | Telemundo</h4>
                <p>Video oficial de Noticias Telemundo. Con un costo de más de 250 millones de dólares, el nuevo centro global de operaciones Telemundo Center albergará a 1500 empleados en sus 13 estudios.</p>
                <a onClick={this.streetView} href="#" className="btn btn-primary">street</a>
              </div>
            </div>
        </InfoWindow>
      </Map>
      </div>
      
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA8BwpKOR2N1Orq_yrBYG9Isy2Vm3aKd-k"
})(MapContainer);

