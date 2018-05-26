import React, { Component } from 'react';
import CRCService from '../utils/CRC.js';
import HammondCodingService from '../utils/hammondCode.js';
import ParityService from '../utils/parity.js';
import './inputPage.css';

class InputPage extends Component {


    constructor(props){
        super(props);
        this.state={
            inputText: "",
            inputSignal: "inputSignal",
            disruptedSignal: "disruptedSignal",
            outputSignal: "outputSignal",
        }
    }

    _clickHandlerInput = (e) => {
        console.log('convert');
        this.setState({inputSignal: this.state.inputText+" binary"});
        this.setState({disruptedSignal: this.state.inputText+" encoded"});
        this.setState({outputSignal: this.state.outputSignal+" encoded"});
    }
    _clickHandlerError = (e) => {
        console.log('error');
    }
    _clickHandlerDisrupt = (e) => {
        this.setState({outputSignal: this.state.disruptedSignal});
    }


    _changeHandlerInput = (e) => {
        this.setState({inputText: e.target.value});
    }
    _changeHandlerError = (e) => {
        this.setState({disruptedSignal: e.target.value});
    }

    encode(){
        switch(this.props.code){
            case "crc":
                return CRCService.testFunc();
            case "hammond":
                return HammondCodingService.testFunc();
            case "parity":
                return ParityService.testFunc();
            default: 
                return ParityService.testFunc();
        }
    }

    markErrors(){

        return 'marked output '+this.state.outputSignal;
    }

    fixErrors(){
        return 'fixed output '+this.state.outputSignal;
    }

    trimRedundancy(){
        return 'fixed output '+this.state.outputSignal;
    }

    render() {
        return (
        <div className="wrapper">
            <h1>{this.props.code}</h1>

            <div className="block">
                <h3>Input text:</h3>
                <textarea onChange={this._changeHandlerInput}/>
                <button className="button" onClick={this._clickHandlerInput}>Convert</button>
            </div>

            <div className="block">
                <h3>Input signal:</h3>
                <textarea disabled value={this.state.inputSignal}/>
            </div>

            <div className="block">
                <h3>Disrupted signal:</h3>
                <textarea onChange={this._changeHandlerError} value={this.state.disruptedSignal}/>
                <button className="button" onClick={this._clickHandlerError}>Random error</button>

                <button className="button" onClick={this._clickHandlerDisrupt}>Disrupt</button>
            </div>

            <div className="block">
                <h3>Output signal:</h3>
                <textarea disabled value={this.state.outputSignal}/>

                 <div className="block">
                    <b>Errors found:</b>
                    <textarea disabled value={this.markErrors()}/>

                    <b>Errors fixed:</b>
                    <textarea disabled value={this.fixErrors()}/>

                    <b>Without redundancy:</b>
                    <textarea disabled value={this.trimRedundancy()}/>
                </div>
            </div>
        </div>
        );
    }
}

export default InputPage;
