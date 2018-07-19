import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      login:false,
      comp:'login',
      answers:{
        ans1:'',
        ans2:'',
        ans3:''
      }
    };
  }
  render() {
    var login = "";
    var question = "";
    if(this.state.login === false && this.state.comp === 'login'){
      login = <Login />
    }
    return (
      <div className="App">
        {login}
        {question}
      </div>
    );
  }
}

export default App;
