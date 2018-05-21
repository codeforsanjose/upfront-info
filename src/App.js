import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';

// components
import InputQuestion from './components/InputQuestion';

class App extends Component {

  componentDidMount() {
    axios.get('../graph.json')
      .then(graph => {
        
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Upfront Info</h1>
        </header>
        <p className="App-intro">
        </p>
        <InputQuestion />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { position: state.position };
}

export default connect(mapStateToProps, null)(App);
