import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import '../cssstyles/mapbox.css';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import 'mapbox-gl/dist/mapbox-gl.css';
let MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
let query = ('./mapbox-geocode.js');

// let mapboxglKey = process.env.MAPBOX_KEY;
let mapboxglKey = 'pk.eyJ1IjoiYnZpMTk5NCIsImEiOiJjamg1anZsNzQwejQ1MndvMjB6YXY5NGlxIn0.UDg3M090DtEuTUy_s2NJ_A'
// Currently trying to figure out how to get the token from process.env

let geocoder = new MapboxGeocoder({
  accessToken: mapboxglKey
});

//`Your token goes here`

class MapPage extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <Map/>
        <LocationInfoForm/>
      </div>
    )
  }
}

class LocationInfoForm extends Component{
  // The address that is given to us is probably going to be a state
  constructor(props){
    super(props);
    this.state = {
      location: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange(event){
      this.setState({
        location: event.target.value
      });
    }

    handleSubmit(event){
      console.log("Location: ", this.state.location);
      event.preventDefault();
    }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Location:
            <input
              type="text"
              value={this.state.location}
              onChange ={this.handleChange}
            />
          </label>
        </form>
      </div>
    );
  }

}

class Map extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    MapboxGl.accessToken = mapboxglKey;
    // console.log("Token ", mapboxglKey);

    let map = new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-121.8863, 37.3382],
      zoom: 11,
    })

    map.addControl(geocoder);

    map.addControl(new MapboxGl.NavigationControl());

    map.on('load', () => {
      map.addSource('single-point', {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": []
        }
      })
      map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
        "circle-radius": 10,
        "circle-color": "#007cbf"
        }
      })
    });

    geocoder.on('result', function(ev) {
      map.getSource('single-point').setData(ev.result.geometry);
    });

  }
  render(){
    return(
      <div className='Map' ref={(x) => {this.container=x}}>
      </div>
    )
  }
}

export default MapPage;
