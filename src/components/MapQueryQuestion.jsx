import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import mapboxgl from 'mapbox-gl';
import * as Geocoder from 'react-geocoder-autocomplete';
var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ1Y2V3b25nMjEiLCJhIjoiY2poZndkeTR4MWFwOTM2bmdkMmx6Mm4ybyJ9.1H2g7mh2iviU707N3mkJ4Q';

class MapQueryQuestion extends Component {

  constructor(props) {
    super(props);
  }




  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/brucewong21/cjidy5mj81oe62trq1jt0d131',
      center: [-121.8929, 37.3351],
      zoom: 14
    });

    this.map.on('load', function() {
        this.map.addSource('single-point', {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": []
            }
        });

        this.map.addLayer({
            "id": "point",
            "source": "single-point",
            "type": "circle",
            "paint": {
                "circle-radius": 10,
                "circle-color": "#007cbf"
            }
        });

        // Listen for the `geocoder.input` event that is triggered when a user
        // makes a selection and add a symbol that matches the result.
      geocoder.on('result', function(ev) {
          this.map.getSource('single-point').setData(ev.result.geometry);
          let x = ev.result.geometry.coordinates[0];
          let y = ev.result.geometry.coordinates[1];
          let point = {x, y};
      }.bind(this));    
    }.bind(this));

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    });



    document.getElementById('geocoder-container').appendChild(geocoder.onAdd(this.map));
  }

  render() {
    const { handleSubmit, question } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <h1>{ question }</h1>
        <Field name='businessAddress' component='hidden'></Field>
        <div id='geocoder-container'></div>
        <div id='map-container'
          style={
            {
              'display': 'flex',
              'flexAlign': 'center',
              'height': '300px'
            }
          }
        ></div>
        
        <button>Submit</button>
      </form>     
    );
  }
}


export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(MapQueryQuestion)