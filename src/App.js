import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';

// components
import InputQuestion from './components/InputQuestion';
import DropDownQuestion from './components/DropDownQuestion';
import MapQueryQuestion from './components/MapQueryQuestion';

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
    e.preventDefault();
    const { movePosition } = this.props;
    movePosition(position);
  }

  render() {
    let { graph, position } = this.props;
    if (graph.nodes === undefined) { return <div>Loading...</div> }

    let node = graph.nodes[position];

    let questionString = node.question;
    let answerType = node.a_type;
    let question;

    if (answerType === 'dropdown') {
      question = <DropDownQuestion
        question={ questionString }
        options={ node.a_choices } 
        handleSubmit={ this.forwardNode.bind(null, graph.adjancey[position][0]) } />;
    } else if (answerType === 'input') {
      question = <InputQuestion
        question={ questionString }
        handleSubmit={ this.forwardNode.bind(null, graph.adjancey[position][0]) } />;
    } else if (answerType === 'mapQuery') {
      question = <MapQueryQuestion
        question={ questionString }
        handleSubmit={ this.forwardNode.bind(null, graph.adjancey[position][0]) } />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Upfront Info</h1>
        </header>
        <div id='map-container'
          style={
            {
              'display': 'flex',
              'flex-align': 'center',
              'height': '300px'
            }
          }
        ></div>
        <p className="App-intro">
        </p>
        { question }
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
