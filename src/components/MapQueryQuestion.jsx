import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import mapboxgl from 'mapbox-gl';
var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ1Y2V3b25nMjEiLCJhIjoiY2poZndkeTR4MWFwOTM2bmdkMmx6Mm4ybyJ9.1H2g7mh2iviU707N3mkJ4Q';

function MapQueryQuestion({handleSubmit, question}) {

  const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-121.8929, 37.3351],
      zoom: 14
  });


  map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
  }));  

  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});

  document.getElementById('map-container').appendChild(geocoder.onAdd(map));


  return (
    <form onSubmit={ handleSubmit }>
      <h1>{ question }</h1>
      
      <Field id='geocoder' name="businessAddress" component="input">
      </Field>
      <button>Submit</button>
    </form>    
  );
};

export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(MapQueryQuestion)