import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

function DropdownPage({question, choices}) {
	return (
		<div>
			<h1>{ question }</h1>
      <Field name="favoriteColor" component="select">
        <option />
        <option value="#ff0000">Red</option>
        <option value="#00ff00">Green</option>
        <option value="#0000ff">Blue</option>
      </Field>
		</div>
	);
}

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(DropdownPage)

