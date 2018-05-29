import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';

// components
import InputQuestion from './components/InputQuestion';
import DropDownQuestion from './components/DropDownQuestion';

// actions
import { fetchGraph } from './actions/graphActions';

class App extends Component {

  constructor(props) {
    super(props);
    this.forwardNode = this.forwardNode.bind(this);
  }

  componentDidMount() {
    fetchGraph();
  }

  forwardNode(e) {
    e.preventDefault();
    console.log("forwarding node");
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
        handleSubmit={ this.forwardNode } />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Upfront Info</h1>
        </header>
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
  return { fetchGraph: dispatch(fetchGraph()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
