import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
// import * as Geocoder from 'react-geocoder-autocomplete';
import {
  changePointCoordinates,
  changeCenterCoordinates,
  setZoningAbbreviation,
  setZoningDescription
} from '../actions/mapActions';
var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ1Y2V3b25nMjEiLCJhIjoiY2poZndkeTR4MWFwOTM2bmdkMmx6Mm4ybyJ9.1H2g7mh2iviU707N3mkJ4Q';

class MapQueryQuestion extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("CALLED");
    const { 
      setZoningAbbreviation, 
      setZoningDescription,
      changePointCoordinates
    } = this.props;
    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/brucewong21/cjidy5mj81oe62trq1jt0d131',
      center: [-121.8929, 37.3351],
      zoom: 14,
      maxZoom: 28
    });

    this.map.on('mousemove', function (e) {
        document.getElementById('info').innerHTML =
            // e.point is the x, y coordinates of the mousemove event relative
            // to the top-left corner of the map
            JSON.stringify(e.point) + '<br />' +
            // e.lngLat is the longitude, latitude geographical position of the event
            JSON.stringify(e.lngLat);
    });    

    this.geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
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
    }.bind(this));

    this.map.on('click', function(e) {
      console.log("YOU CLICKED THE MAP");
      console.log(e);
      let { point } = e;
      let features = this.map.queryRenderedFeatures(point, { layers: ['zoning-201804191549049432-8zfao8'] });
      let { ZONING, ZONINGABBR } = features[0].properties;
      setZoningDescription(ZONING);
      setZoningAbbreviation(ZONINGABBR);
    }.bind(this));

    this.geocoder.on('result', function(geoCodeEvent) {
      this.map.getSource('single-point').setData(geoCodeEvent.result.geometry);
      
      this.map.once('moveend', moveEvent => {
        let lat = geoCodeEvent.result.geometry.coordinates[0];
        let lng = geoCodeEvent.result.geometry.coordinates[1];
        let latLng = [lat, lng];
        let point = this.map.project(latLng);
        changePointCoordinates(point);
        let features = this.map.queryRenderedFeatures(point, { layers: ['zoning-201804191549049432-8zfao8'] });
        if (features[0]) {
          let { ZONING, ZONINGABBR } = features[0].properties;
          setZoningDescription(ZONING);
          setZoningAbbreviation(ZONINGABBR);
        }
    });
    }.bind(this));




    document.getElementById('geocoder-container').appendChild(this.geocoder.onAdd(this.map));
  }

  render() {
    const { 
      handleSubmit, 
      question, 
      zoningDescription,
      zoningAbbreviation
    } = this.props;

    return (
      <form onSubmit={ handleSubmit }>
        <h1>{ question }</h1>
        <h1>{ zoningDescription }</h1>
        <h1>{ zoningAbbreviation }</h1>
        <pre id='info'></pre>
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

const mapStateToProps = state => {
  return {
    zoningAbbreviation: state.map.zoningAbbreviation,
    zoningDescription: state.map.zoningDescription,
    point: state.map.point
  };
};

const mapDispatchToProps = dispatch => {
  return { 
    changePointCoordinates: point => {
      dispatch(changePointCoordinates(point));
    },
    changeCenterCoordinates: center => {
      dispatch(changeCenterCoordinates(center));
    },
    setZoningDescription: desc => {
      dispatch(setZoningDescription(desc));
    },
    setZoningAbbreviation: abbr => {
      dispatch(setZoningAbbreviation(abbr));
    }
  };
};

const connectedMapQueryQuestion = connect(mapStateToProps, mapDispatchToProps)(MapQueryQuestion);


export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(connectedMapQueryQuestion)