import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
// import * as Geocoder from 'react-geocoder-autocomplete';
import {
  changePointCoordinates,
  changeCenterCoordinates,
  setZoningAbbreviation,
  setZoningDescription,
  setAddress,
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
      changePointCoordinates,
      setAddress
    } = this.props;

    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'style.json',
      center: [-121.8929, 37.3351],
      zoom: 14,
      maxZoom: 24
    });

    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
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
                "circle-radius": 10,
                "circle-color": "#007cbf"
            }
        });

        // Listen for the `geocoder.input` event that is triggered when a user
        // makes a selection and add a symbol that matches the result.   
    }.bind(this));

    this.map.on('click', function(e) {
      let { point } = e;
      let features = this.map.queryRenderedFeatures(point, { layers: ['zoning-201804191549049432-8zfao8'] });
      if (features.length === 0) { return; }
      let { ZONING, ZONINGABBR } = features[0].properties;
      setZoningDescription(ZONING);
      setZoningAbbreviation(ZONINGABBR);
    }.bind(this));

    this.geocoder.on('result', function(geoCodeEvent) {
      this.map.getSource('single-point').setData(geoCodeEvent.result.geometry);
      setAddress({
        address: geoCodeEvent.result.place_name,
        name: geoCodeEvent.result.text
      });
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
      zoningAbbreviation,
      address,
      addressName,
      position, 
      forwardPositions
    } = this.props;

    return (
      <div className="address-form">
        <div className="card">
          <div className="address-form__field">
            <h3>{ question }</h3>
            <div id='geocoder-container'></div>
          </div>
          <div className="card__body">
            <div className="address-form__results">
              <table>
                <thead>
                  <tr>
                    <th>Place</th>
                    <th>Zone Description</th>
                    <th>Zone Abbreviation</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ addressName } </td>
                    <td>{ zoningDescription }</td>
                    <td>{ zoningAbbreviation }</td>
                    <td>{ address }</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> 
          <form onSubmit={(e) => {handleSubmit(forwardPositions[0], e)}}>
            <Field name='businessAddress' component='hidden'></Field>
            <button>Next</button>
          </form>                   
        </div>
        <div className="card card--no-paddding">
          <div id='map-container'
              style={
              {
                'display': 'flex',
                'flexAlign': 'center',
                'height': '480px'
              }
            }></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    zoningAbbreviation: state.map.zoningAbbreviation,
    zoningDescription: state.map.zoningDescription,
    point: state.map.point,
    address: state.map.address,
    addressName: state.map.name, 
    position: state.position,
    forwardPositions: state.graph.adjancey[state.position]
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
    },
    setAddress: place => dispatch(setAddress(place))
  };
};

const connectedMapQueryQuestion = connect(mapStateToProps, mapDispatchToProps)(MapQueryQuestion);


export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(connectedMapQueryQuestion)