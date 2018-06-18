import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


function ZoningInfoStatement({handleSubmit, heading, zoningAbbreviation, zoningDescription, position, forwardPositions}) {
  return (
    <form onSubmit={(e) => {handleSubmit(forwardPositions[0], e)}}>
      <h1>{ heading }</h1>
      <h2>Your zoning code is { zoningAbbreviation }</h2>
      <h2>which means { zoningDescription }</h2>
      <button>Submit</button>
    </form>    
  );
};

const mapStateToProps = state => {
  return {
    zoningAbbreviation: state.map.zoningAbbreviation,
    zoningDescription: state.map.zoningDescription,
    position: state.position,
    forwardPositions: state.graph.adjancey[state.position]
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

let connectedZoningInfoStatement = connect(mapStateToProps, mapDispatchToProps)(ZoningInfoStatement);


export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(connectedZoningInfoStatement);