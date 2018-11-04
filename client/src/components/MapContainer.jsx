/* eslint-disable no-unused-expressions */
/**
 * This component helps create an interactive Google Map Background
 *
 * CHECK: https://www.npmjs.com/package/google-maps-react
 */
import React from "react";
import Popup from 'reactjs-popup';
import ReactDOM from 'react-dom';
import { Map, InfoWindow, Marker, GoogleApiWrapper, StreetViewPanorama } from "google-maps-react";
import liddo from '../assets/liddo.png';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Initial Center of Map
      position: {
        lat: 25.7954910, 
        lng: -80.386,
      },
      pov: {
        heading: 280,
        pitch: 0,
      },
      showingStreetView: false,
      showingInfoWindow: false,
      showingInfoWindowToo: false,
      activeMarker: {},
      selectedPlace: {},
      selectedPlaceToo: {},
      activeMarkerToo: {},
      
      // Initial Markers on Map
      markers: props.markers,
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMarkerClickToo = this.onMarkerClickToo.bind(this);
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
    const moveLat = 25.799456503069705;
    const moveLong = -80.3881903576721;
    let center = new maps.LatLng(moveLat, moveLong);
    map.panTo(center)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMarkerClickToo(props, marker, event) {
    // console.log("Latitude: ", event.latLng.lat());
    // console.log("Longitude: ", event.latLng.lng());
    // console.log(event, 'event');
    // console.log(props, 'marker props')
    // props.video gets you src
    // this.props.click(props.video);
    this.setState({
      selectedPlaceToo: props,
      activeMarkerToo: marker,
      showingInfoWindowToo: true
    });
  }

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
  
  onInfoWindowOpen(props, e) {
    const button = (<button onClick={(e) => {

      console.log(this, 'this')
      console.log(props, 'props of map')
      const node = ReactDOM.findDOMNode(this);
      const panorama = new props.google.maps.StreetViewPanorama(document.getElementById('pano'), {
        position: this.state.position,
        pov: this.state.pov,
        linksControl: false,
        visible: true,
      panControl: false,
      enableCloseButton: false,
      zoomControl: false,
      fullscreenControl: false
      });
      console.log(panorama);
      panorama.setVisible(true);
      document.getElementById('secondFrame').setAttribute('style', 'display: block; position: absolute; top: 40vh; left: 10vw; z-index: 2000')
      document.getElementById('backToMap').setAttribute('style', 'display: block; position: absolute; top: 100px; left: 25px; z-index: 2010; color: red; background-color: white; border: 2px solid red; border-radius: 5px;')
    }}><img src={liddo} style={{ width: '25px' }} /></button>);
    ReactDOM.render(React.Children.only(button), document.getElementById("iwc"));
  }
  backToMap() {
    document.getElementById('secondFrame').setAttribute('style', 'display: none;');
    document.getElementById('backToMap').setAttribute('style', 'display: none;');
    document.getElementById('pano').setAttribute('style', 'display: none;');

  }
  render() {
      
      const mapStuff = this.state.markers.map(marker => 
             ( <Marker
                key={marker.position.lat}
                video={marker.url}
                position={marker.position}
                onClick={this.onMarkerClickToo}
              />)
          );
          const money = (<div><Marker 
            map={this.props.map}
            position={this.state.position} 
            onClick={this.onMarkerClick}
            name={'Current location'} 
            />
          
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onOpen={e => {
              this.onInfoWindowOpen(this.props, e);
            }}
            >
              <div>
                <iframe style={{ zIndex: '1610' }} width="300px" height="100%" src="https://www.youtube.com/embed/tK4W-V34DFo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div style={{ width: '300px'}}>
                  <h4 style={{ fontSize: '1rem' }}>Abre sus puertas la nueva sede de Telemundo en Miami | Noticiero | Telemundo</h4>
                  <p>Video oficial de Noticias Telemundo. Con un costo de más de 250 millones de dólares, el nuevo centro global de operaciones Telemundo Center albergará a 1500 empleados en sus 13 estudios.</p>
                  <div id="iwc" />
                </div>
              </div>
          </InfoWindow></div>)
          let moneyShot = '';
          let mapOpacity = '0.5';
          if (this.state.markers.length > 0) {
            mapOpacity = '1';
            moneyShot = (<Marker 
              map={this.props.map}
              style={{display: moneyShot}}
              position={this.state.position} 
              onClick={this.onMarkerClick}
              name={'Current location'} 
              />);
          }

    return (
      
      <div style={{ width: '100vw', height: '100vh', opacity: mapOpacity }} className="col-xs-12">
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
        style={{ width: "100%", height: "88%", marginTop: '80px', zIndex: '100', }}
      >
        {mapStuff}
        {moneyShot}

          <InfoWindow
          marker={this.state.activeMarkerToo}
          visible={this.state.showingInfoWindowToo}
          >
          <div>
          <iframe title="video" style={{ zIndex: '1600', width: '100%', height: '80%' }} src={this.state.selectedPlaceToo.video} width="500px"></iframe>
          </div>
          </InfoWindow>
  
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onOpen={e => {
              this.onInfoWindowOpen(this.props, e);
            }}
            >
              <div>
                <iframe style={{ zIndex: '1610' }} width="300px" height="100%" src="https://www.youtube.com/embed/tK4W-V34DFo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div style={{ width: '300px'}}>
                  <h4 style={{ fontSize: '1rem' }}>Abre sus puertas la nueva sede de Telemundo en Miami | Noticiero | Telemundo</h4>
                  <p>Video oficial de Noticias Telemundo. Con un costo de más de 250 millones de dólares, el nuevo centro global de operaciones Telemundo Center albergará a 1500 empleados en sus 13 estudios.</p>
                  <div id="iwc" />
                </div>
              </div>
          </InfoWindow>
      </Map>
      <a onClick={this.backToMap} id="backToMap" className="btn" style={{ zIndex: '1610', display: 'none', borderRadius: '5px', border: '1px solid red', backgroundColor: 'white', color: 'red' }}>Regresar</a>
      <iframe id="secondFrame" style={{ zIndex: '1610', display: 'none' }} width="300px" height="200px" src="https://www.youtube.com/embed/tK4W-V34DFo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div id="pano" style={{width: '100%', height: '100%', zIndex: '100'}}></div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB24o8G937MQhxuckQxooH5d0pC5tuHmjU"
})(MapContainer);

