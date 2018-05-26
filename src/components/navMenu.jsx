import React, { Component } from 'react';
import NavButton from './navButton.jsx';
import './navStyles.css';

class NavMenu extends Component {
    
  render() {
    return (
        <div className="navWrapper">
            <NavButton name="CRC" value="crc" handleClick={this.props.handleClick}/>
            <NavButton name="Hammond Code" value="hammond" handleClick={this.props.handleClick}/>
            <NavButton name="Parity" value="parity" handleClick={this.props.handleClick}/>
        </div>
    );
  }
}

export default NavMenu;
