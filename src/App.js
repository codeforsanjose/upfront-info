import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import InputQuestion from './components/InputQuestion';
import DropDownQuestion from './components/DropDownQuestion';
import MapQueryQuestion from './components/MapQueryQuestion';
import ZoningInfoStatement from './components/ZoningInfoStatement';
import SingleStatement from './components/SingleStatement';
import ZoningLookupStatement from './components/ZoningLookupStatement';
import YesNoQuestion from './components/YesNoQuestion';

// actions
import { fetchGraph } from './actions/graphActions';
import { movePosition } from './actions/positionActions';


class App extends Component {

  constructor(props) {
    super(props);
    this.forwardNode = this.forwardNode.bind(this);
  }

  componentDidMount() {
    const { fetchGraph } = this.props;
    fetchGraph();
  }

  forwardNode(position, e) {
    if (e !== undefined) { e.preventDefault(); }
    const { movePosition } = this.props;
    movePosition(position);
  }

  render() {
    let { graph, position } = this.props;
    if (graph.nodes === undefined) { return <div>Loading...</div> }

    let node = graph.nodes[position];
    let questionString = node.question;
    let questionType = node.q_type;
    let question;

    if (questionType === 'dropdown') {
      question = <DropDownQuestion
        question={ questionString }
        options={ node.a_choices } 
        handleSubmit={(node, e) => {
          this.forwardNode(node, e);
        }} />        
    } else if (questionType === 'input') {
      question = <InputQuestion
        question={ questionString }
        handleSubmit={(node, e) => {
          this.forwardNode(node, e);
        }} />        
    } else if (questionType === 'mapQuery') {
      question = <MapQueryQuestion
        question={ questionString }
        handleSubmit={(node, e) => {
          this.forwardNode(node, e);
        }} />        
    } else if (questionType === 'zoningInfo') {
      question = <ZoningInfoStatement 
        heading={ questionString }
        handleSubmit={(node, e) => {
          this.forwardNode(node, e);
        }} />        
    } else if (questionType === 'singleStatement') {
      question = <SingleStatement
        heading={ questionString }
        handleSubmit={(node, e) => {
          this.forwardNode(node, e);
        }} />
    } else if (questionType === 'lookupStatement') {
      question = <ZoningLookupStatement 
        heading={ questionString }
        handleSubmit={(node, e) => {
          this.forwardNode(node, e);
        }} />
    } else if (questionType === 'yesNoQuestion') {
      let label = node.q_label;
      question = <YesNoQuestion
        heading={ questionString }
        label={ label }
        handleSubmit={(node, e) => {
          this.forwardNode(node, e);
        }} />
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <h1>Upfront Info</h1>
          </div>
        </header>
        <section className="progress">
          <div className="container">
            <div className="progress__point">
              <h3>Business Type</h3> 
            </div>
            <div className="progress__point">
              <h3>></h3> 
            </div>
            <div className="progress__point">
              <h3>Location</h3> 
            </div>
          </div>
        </section>
        <main>
          <div className="container">
              { question }
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    position: state.position,
    graph: state.graph 
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    fetchGraph: () => {
      dispatch(fetchGraph());
    },
    movePosition: pos => {
      dispatch(movePosition(pos));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
