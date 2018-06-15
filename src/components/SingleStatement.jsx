import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


function SingleStatement({handleSubmit, heading}) {
  return (
    <form onSubmit={ handleSubmit }>
      <h1>{ heading }</h1>
      <button>Submit</button>
    </form>    
  );
};

const mapStateToProps = state => {
  return {
    state
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

let connectedSingleStatement = connect(mapStateToProps, mapDispatchToProps)(SingleStatement);


export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(SingleStatement);