import React, { Component } from 'react';
import NavMenu from './components/navMenu.jsx';
import InputPage from './components/inputPage.jsx';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      navTarget: "crc"
    }

    this._setNav = this._setNav.bind(this);
  }

  _setNav = (val) => {
    this.setState({navTarget: val,});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Data Corection Codes</h1>
          <b>A simple app presenting different data corection codes</b>
        </header>
        <NavMenu handleClick={this._setNav}/>
        <InputPage code={this.state.navTarget}/>
      </div>
    );
  }
}

export default App;
