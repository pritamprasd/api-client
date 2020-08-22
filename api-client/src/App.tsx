import React, { Component } from 'react';
import './App.css';
import RequestParentComponent from './request/RequestParentComponent';
import BackEndServiceStatus from './status/BackEndServiceStatus';

class App extends Component{
  render(){
    return (
      <div>
        <BackEndServiceStatus/>
        <RequestParentComponent name=""/>        
      </div>
    );
  }
}

export default App;

