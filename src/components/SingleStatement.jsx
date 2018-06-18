import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


function SingleStatement({handleSubmit, heading, position}) {
  return (
    <form onSubmit={(e) => {handleSubmit(position + 1, e)}}>
      <h1>{ heading }</h1>
      <button>Submit</button>
    </form>    
  );
};

const mapStateToProps = state => {
  return {
    position: state.position 
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
})(connectedSingleStatement);