import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchZoningTable, fetchPermitTable } from '../actions/lookupTableActions';

class ZoningLookupStatement extends Component {
  constructor(props) {
    super(props);
    this.indexZoningTable = this.indexZoningTable.bind(this);
    this.indexPermitTable = this.indexPermitTable.bind(this);
  }

  componentDidMount() {
    const { fetchZoningTable, fetchPermitTable } = this.props;
    fetchZoningTable();
    fetchPermitTable();
  }

  indexZoningTable() {
    const { businessType, zoningTable } = this.props;
    const zoningCodeUse = zoningTable[businessType];
    return zoningCodeUse;
  }

  indexPermitTable(zoningCodeUse) {
    const { permitTable, zoningAbbreviation } = this.props;
    const permitAbbreviation = permitTable[zoningCodeUse][zoningAbbreviation];
    return permitAbbreviation;
  }

  render() {
    const { zoningTable, permitTable } = this.props;
    if (!zoningTable || !permitTable) { return <h1>LOADING</h1> } 

    const zoningCodeUse = this.indexZoningTable();
    const permitAbbreviation = this.indexPermitTable(zoningCodeUse);

    switch(permitAbbreviation) {
      case null:
        return <h1>Sorry, your use is not allowed in this Zoning District</h1>
        break;
      case 'PD':
        return <h1>Since your site is in Planned Development Zoning (PD), you will need to visit the Planning Counter</h1>
        break;
      case 'C':
        return <h1>A SUP or CUP is required, you will need to visit the Planning Counter first</h1>
        break;
      case 'P':
        return <h1>Your use is allowed. Now I am going to ask a few more questions to figure out what permits you may need</h1>
        break;
      default:
        return <h1>Sorry, your use is not allowed in this Zoning District</h1>
    }
  }
}

const mapStateToProps = state => {
  return {
    zoningTable: state.lookup.zoningTable,
    permitTable: state.lookup.permitTable,
    businessType: state.form.wizard.values.businessType.toLowerCase(), // this should be indexed way before
    zoningAbbreviation: state.map.zoningAbbreviation
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchZoningTable: () => {
      dispatch(fetchZoningTable());
    },
    fetchPermitTable: () => {
      dispatch(fetchPermitTable());
    }
  }
};

let connectedZoningLookupStatement = connect(mapStateToProps, mapDispatchToProps)(ZoningLookupStatement);


export default reduxForm({
  form: 'wizard', 
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(connectedZoningLookupStatement);