import React, { Component } from 'react';
import '../css/mapProject.css';
import FirstEnter from '../components/FirstEnter';
import HomeComponent from '../components/HomeComponent';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      location: null
    }
  }

  checkLocation(){
    if(this.state.location === null){
      return <FirstEnter />
    } else{
      return <HomeComponent />
    }
  }

  render() {
    return (
      <div className="App">
          {this.checkLocation()}
      </div>
    );
  }
}

export default App;
