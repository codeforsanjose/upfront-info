import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class YesNoButtons extends Component {

  constructor(props) {
    super(props);
    this.setValue = this.setValue.bind(this);
  }

  setValue(yesNoValue) {
    const { position } = this.props;
    const { input: { value, onChange}, forwardPositions, handleSubmit } = this.props;
    onChange(yesNoValue);

    const yesNoMap = {
      "yes": 0,
      "no": 1,
      "na": 2
    };

    const positionToMoveTo = yesNoMap[yesNoValue];
    handleSubmit(forwardPositions[positionToMoveTo]);
  }

  render() {
    const { input: { value, onChange } } = this.props
    return (
      <form className="yes-no-buttons">
        <button type="button" onClick={() => { this.setValue("yes") }}>Yes</button>
        <button type="button" onClick={() => { this.setValue("no")  }}>No</button>
        <button type="button" onClick={() => { this.setValue("na")  }}>Don't Know</button>
      </form>
    )
  }
}

function YesNoQuestion({handleSubmit, heading, position, forwardPositions, label}) {
  return (
    <div>
      <h1>{ heading }</h1>
      <Field 
        component={ YesNoButtons } 
        name={ label }
        forwardPositions={ forwardPositions } 
        handleSubmit={ handleSubmit } />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    position: state.position.currentPosition,
    forwardPositions: state.graph.adjancey[state.position.currentPosition]
  };
};

const connectedYesNoQuestion = connect(mapStateToProps, null)(YesNoQuestion);

export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(connectedYesNoQuestion)