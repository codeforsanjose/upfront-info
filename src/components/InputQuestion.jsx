import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

function InputQuestion({handleSubmit, question}) {
  return (
    <form onSubmit={ handleSubmit }>
      <h1>{ question }</h1>
      <Field name="businessAddress" component="input">
      </Field>
      <button>Submit</button>
    </form>    
  );
};

export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(InputQuestion)