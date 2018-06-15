import React from 'react';
import { Field, reduxForm } from 'redux-form';

function DropDownQuestion(props) {
  let { question, options, handleSubmit } = props;
  return (
    <form onSubmit={ handleSubmit }>
      <h1>{ question }</h1>
      <Field name="businessType" component="select" className="custom-select">
        { options.map(opt => {
          return <option>{opt}</option>
        }) }      
      </Field>
      <button className="btn btn-outline-primary">Submit</button>
    </form>
  );
}

export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  initialValues: { businessType: "Bar" },
  forceUnregisterOnUnmount: true
})(DropDownQuestion)
