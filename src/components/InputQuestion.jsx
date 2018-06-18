import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

function InputQuestion({handleSubmit, question, position}) {
  return (
    <form onSubmit={(e) => {handleSubmit(position + 1, e)}}>
      <h1>{ question }</h1>
      <Field name="businessAddress" component="input">
      </Field>
      <button>Submit</button>
    </form>    
  );
};

const mapStateToProps = state => {
  return {
    position: state.position
  };
};

const connectedInputQuestion = connect(mapStateToProps, null)(InputQuestion);

export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(connectedInputQuestion)