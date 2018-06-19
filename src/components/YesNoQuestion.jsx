import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

function YesNoQuestion({handleSubmit, question, position, forwardPositions}) {
  return (
    <form>
      <h1>{ question }</h1>
      <button onClick={(e) => {handleSubmit(forwardPositions[0]), e}}>Yes</button>
      <button onClick={(e) => {handleSubmit(forwardPositions[0]), e}}>No</button>
    </form>    
  );
};

const mapStateToProps = state => {
  return {
    position: state.position,
    forwardPositions: state.graph.adjancey[state.position]
  };
};

const connectedYesNoQuestion = connect(mapStateToProps, null)(YesNoQuestion);

export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(connectedYesNoQuestion)