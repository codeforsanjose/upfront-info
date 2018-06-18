import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


function SingleStatement({handleSubmit, heading, position, forwardPositions, businessType, address}) {

  // If there are variables in the heading
  const variablesMatched = heading.match(/#{(\w+)}/g);
  if (variablesMatched) {
    let variables = variablesMatched.map(e => { return e.match(/#{(.+)}/)[1] })
    variables.forEach(v => {
      const variable = eval(v);
      const regExp = new RegExp(`#{${v}}`, 'g');
      heading = heading.replace(regExp, variable);
    });
  }

  return (
    <form onSubmit={(e) => {handleSubmit(forwardPositions[0], e)}}>
      <h1>{ heading }</h1>
      <button>Submit</button>
    </form>    
  );
};

const mapStateToProps = state => {
  return {
    position: state.position,
    businessType: state.form.wizard.values.businessType,
    address: state.map.address,
    forwardPositions: state.graph.adjancey[state.position]
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