import React, { Component } from 'react';
import CRCService from '../utils/CRC.js';
import HammingCodingService from '../utils/hammingCode.js';
import ParityService from '../utils/parity.js';
import './inputPage.css';
import leftPad from 'left-pad';

class InputPage extends Component {


    constructor(props){
        super(props);
        this.state={
            inputText: "Input Text",
            inputSignal: "Input Signal",
            disruptedSignal: "Disrupted Signal",
            outputSignal: "Output Signal",
            outputSignalErr: "N/A",
            outputSignalFix: "N/A",
            outputSignalRed: "N/A",
        }
    }

    _clickHandlerInput = (e) => {
        let signal = this.state.inputText
            .split('')
            .reduce((prev, curr) => prev + leftPad(curr.charCodeAt(0).toString('2', '0', 8)), '');
  
        this.setState({inputSignal: signal});
        this.setState({disruptedSignal: signal});
        this.setState({outputSignal: this.encode(signal)});
    }
    _clickHandlerError = (e) => {
        console.log('error');
    }
    _clickHandlerDisrupt = (e) => {
        this.setState({outputSignal: this.encode(this.state.disruptedSignal)});
        this.setState({outputSignalErr: this.markErrors(this.state.outputSignal)});
        this.setState({outputSignalFix: this.fixErrors(this.state.outputSignal)},
        ()=>{this.setState({outputSignalRed: this.trimRedundancy(this.state.outputSignalFix)});}
        );
    }


    _changeHandlerInput = (e) => {
        this.setState({inputText: e.target.value});
    }
    _changeHandlerError = (e) => {
        this.setState({disruptedSignal: e.target.value});
    }

    encode(val){
        switch(this.props.code){
            case "crc":
                return CRCService.testFunc(val);
            case "hamming":
                return HammingCodingService.execCoding(val);
            case "parity":
            default: 
                return ParityService.encode(val);
        }
    }


    markErrors(val){
        switch(this.props.code){
            case "crc":
                return CRCService.testFunc(val);
            case "hamming":
                return HammingCodingService.findErrors(val);
            case "parity":
            default:
                return ParityService.findErrors(val);
        }
    }

    fixErrors(val){
        switch(this.props.code){
            case "crc":
                return CRCService.testFunc(val);
            case "hamming":
                return HammingCodingService.fixErrors(val);
            case "parity":
                return ParityService.testFunc(val);
            default: 
                return ParityService.testFunc(val);
        }
    }

    trimRedundancy(val){
        switch(this.props.code){
            case "crc":
                return CRCService.testFunc(val);
            case "hamming":
                return HammingCodingService.removeRedundancy(val);
            case "parity":
                return ParityService.testFunc(val);
            default: 
                return ParityService.testFunc(val);
        }
    }

    renderTitle(){
        switch(this.props.code){
            case "crc":
                return "CRC";
            case "hamming":
                return "Hamming Code";
            case "parity":
                return "Parity";
            default: 
                return "Parity";
        }
    }

    render() {
        return (
        <div className="wrapper">
            <div className="header">
                <h1>{this.renderTitle()}</h1>
            </div>

            <div className="block inputBlock">
                <h3>Input text:</h3>
                <textarea onChange={this._changeHandlerInput}/>
                <button className="button inputButton" onClick={this._clickHandlerInput}>Convert</button>
            </div>

            <div className="block inputBlock">
                <h3>Input signal:</h3>
                <textarea disabled value={this.state.inputSignal}/>
            </div>

            <div className="block inputBlock">
                <h3>Disrupted signal:</h3>
                <textarea onChange={this._changeHandlerError} value={this.state.disruptedSignal}/>
                <button className="button inputButton" onClick={this._clickHandlerError}>Random error</button>

                <button className="button inputButton" onClick={this._clickHandlerDisrupt}>Disrupt</button>
            </div>

            <div className="block inputBlock">
                <div className="block inputBlock">
                    <h3>Output signal:</h3>
                    <textarea disabled value={this.state.outputSignal}/>
                </div>

                 <div className="block outputBlock">
                    <div className="block inputBlock">
                        <b>Errors found:</b>
                        <textarea disabled value={this.state.outputSignalErr}/>
                    </div>
                    <div className="block inputBlock">
                        <b>Errors fixed:</b>
                        <textarea disabled value={this.state.outputSignalFix}/>
                    </div>
                    <div className="block inputBlock"> 
                        <b>Without redundancy:</b>
                        <textarea disabled value={this.state.outputSignalRed}/>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default InputPage;
