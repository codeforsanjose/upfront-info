import React from 'react';
import { Field, reduxForm } from 'redux-form';

function DropDownQuestion(props) {
  let { question, options, handleSubmit } = props;
  return (
    <div className="card">
      <h3>{ question }</h3>

      <form className="question-form" onSubmit={ handleSubmit }>
        <Field className="input input-form" name="businessType" component="select">
          { options.map(opt => {
            return <option>{opt}</option>
          }) }      
        </Field>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  initialValues: { businessType: "Bar" },
  forceUnregisterOnUnmount: true
})(DropDownQuestion)
