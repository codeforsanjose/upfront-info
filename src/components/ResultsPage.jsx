import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


function ResultsPage({handleSubmit, heading, position, forwardPositions, address, ...props}) {

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
  const { 
    zoningDescription,
    zoningAbbreviation,
    businessName,
    businessAddress,
    businessType
  } = props;
  return (
    <div className="results__main">
      <form onSubmit={(e) => {handleSubmit(forwardPositions[0], e)}}>
        <div className="card">
          <h3>Are you Permitted?</h3>
          <p>{ heading }</p>
        </div>

        <div className="row">
          <div className="column">
            <div className="results__business-info card">
              <h3>Business</h3>
              <p><b>Name: </b>{ businessName }</p>
              <p><b>Type: </b>{ businessType }</p>
              <p><b>Address: </b>{ businessAddress }</p>
            </div>
          </div>
          <div className="column">
            <div className="results__zoning-info card">
              <h3>Zoning</h3>
              <p><b>Description: </b>{ zoningDescription }</p>
              <p><b>Abbreviation: </b>{ zoningAbbreviation }</p>
            </div>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    position: state.position,
    businessType: state.form.wizard.values.businessType,
    address: state.map.address,
    forwardPositions: state.graph.adjancey[state.position],
    zoningAbbreviation: state.map.zoningAbbreviation,
    zoningDescription: state.map.zoningDescription,
    businessAddress: state.map.address,
    businessName: state.map.name
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

let connectedResultsPage = connect(mapStateToProps, mapDispatchToProps)(ResultsPage);


export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(connectedResultsPage);