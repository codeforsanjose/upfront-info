import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

function InputQuestion({handleSubmit, question, position, forwardPositions}) {
  return (
    <form onSubmit={(e) => {handleSubmit(forwardPositions[0], e)}}>
      <h1>{ question }</h1>
      <Field name="businessAddress" component="input">
      </Field>
      <button>Submit</button>
    </form>    
  );
};

const mapStateToProps = state => {
  return {
    position: state.position.currentPosition,
    forwardPositions: state.graph.adjancey[state.position.currentPosition]
  };
};

const connectedInputQuestion = connect(mapStateToProps, null)(InputQuestion);

export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(connectedInputQuestion)