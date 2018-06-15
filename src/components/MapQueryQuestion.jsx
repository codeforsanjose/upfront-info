import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import * as Geocoder from 'react-geocoder-autocomplete';
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
    this.renderMap = this.renderMap.bind(this);
  }

  renderMap() {

    const { 
      setZoningAbbreviation, 
      setZoningDescription,
      changePointCoordinates
    } = this.props;

    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'style.json',
      center: [-121.8929, 37.3351],
      zoom: 14,
      maxZoom: 24
    });

    // Bind map event handlers
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
              "circle-radius": 6,
              "circle-color": "#007cbf"
          }
      });
    }.bind(this));    

    this.map.on('moveend', function(e) {
      const { lng, lat } = e.target.transform._center;
      let latLng = [lng, lat];
      let point = this.map.project(latLng);
      let features = this.map.queryRenderedFeatures(point, { layers: ['zoning-201804191549049432-8zfao8'] });
      if (features[0] !== undefined) {
        let { ZONING, ZONINGABBR } = features[0].properties;
        setZoningDescription(ZONING);
        setZoningAbbreviation(ZONINGABBR);           
      }      
    }.bind(this));

    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    });

    this.geocoder.on('result', function(ev) {
      this.map.getSource('single-point').setData(ev.result.geometry);
    }.bind(this));    

    document.getElementById('geocoder-container').appendChild(this.geocoder.onAdd(this.map)); 
  }

  componentDidMount() {
    this.renderMap();
  }

  render() {
    const { 
      handleSubmit, 
      question, 
      zoningDescription,
      zoningAbbreviation
    } = this.props;
    console.log(this.props);

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
              'height': '500px'
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