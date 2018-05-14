import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import '../cssstyles/mapbox.css';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

// let mapboxglKey = process.env.MAPBOX_KEY;
// Currently trying to figure out how to get the token from process.env

//`Your token goes here`

class MapPage extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        This is a test
        <Map/>
      </div>
    )
  }
}
//
// class LocationInfo extends Component{
//   // The address that is given to us is probably going to be a state
//   constructor(props){
//     super(props);
//   }
//
//
//   render(){
//     return(){
//       <div>
//         Location information
//       </div>
//     }
//   }
// }

class Map extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    MapboxGl.accessToken = mapboxglKey;
    // console.log("Token ", mapboxglKey);

    new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-121.8863, 37.3382],
      zoom: 11,
    })

  }
  render(){
    return(
      <div className='Map' ref={(x) => {this.container=x}}>
        Map goes here
      </div>
    )
  }
}

export default MapPage;
