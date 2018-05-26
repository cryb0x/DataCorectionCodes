import React, { Component } from 'react';
import './buttonStyles.css';

class NavButton extends Component {


    clickHandler = (e) => {
        console.log(this.props.value);
        this.props.handleClick(this.props.value);
    }

    render() {
        return (
                <button className="button navButton" onClick={this.clickHandler}><b>{this.props.name}</b></button>
            );
        }
}
export default NavButton;