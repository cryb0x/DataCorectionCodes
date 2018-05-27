import React, { Component } from 'react';
import { CRCService } from '../utils/CRC.js';
import HammingCodingService from '../utils/hammingCode.js';
import ParityService from '../utils/parity.js';
import './inputPage.css';
import leftPad from 'left-pad';

class InputPage extends Component {


    constructor(props){
        super(props);
        this.state = {
            crctype: 'crc16',
            inputText: "Input Text",
            inputSignal: "Input Signal",
            encodedSignal: "Encoded Signal",
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

        let temp=this.encode(signal);
        this.setState({inputSignal: signal});
        this.setState({encodedSignal: temp});
        this.setState({disruptedSignal: temp});
        this.setState({outputSignal: temp});
    }
    _clickHandlerError = (e) => {
        this.setState((currentState) => {
            const { disruptedSignal } = currentState;
            const bytes = disruptedSignal.split('');

            for (let i = 0; i < 2; i++) {
                const index = Math.floor(Math.random() * bytes.length);
                const byte = bytes[index];
                bytes[index] = (byte === '0') ? '1' : '0';
            }

            return {
                ...currentState,
                disruptedSignal: bytes.join('')
            };
        })
    }
    _clickHandlerDisrupt = (e) => {
        this.setState({outputSignal: this.state.disruptedSignal},
        ()=>{
            this.setState({outputSignalErr: this.markErrors(this.state.outputSignal)});
            this.setState({outputSignalFix: this.fixErrors(this.state.outputSignal)},
            ()=>{this.setState({outputSignalRed: this.trimRedundancy(this.state.outputSignalFix)});}
            );
        });
    }

    _clickHandlerRadioButton = (e) => {
        this.setState({ crctype: e.target.value });
    }


    _changeHandlerInput = (e) => {
        this.setState({inputText: e.target.value});
    }
    _changeHandlerError = (e) => {
        this.setState({disruptedSignal: e.target.value});
    }

    encode(val) {
        switch(this.props.code){
            case "crc":
                return CRCService.encode(val, this.state.crctype);
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
                return CRCService.findErrors(val, this.state.encodedSignal);
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
                return CRCService.fix(val, this.state.crctype);
            case "hamming":
                return HammingCodingService.fixErrors(val);
            case "parity":
            default:
                return val;
        }
    }

    trimRedundancy(val){
        switch(this.props.code){
            case "crc":
                return CRCService.removeRedundancy(val);
            case "hamming":
                return HammingCodingService.removeRedundancy(val);
            case "parity":
            default:
                return ParityService.removeRedundancy(val);
        }
    }

    renderTitle(){
        switch(this.props.code){
            case "crc":
                return "CRC";
            case "hamming":
                return "Hamming Code";
            case "parity":
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
                <textarea value={this.state.inputText} onChange={this._changeHandlerInput}/>
                <button className="button inputButton" onClick={this._clickHandlerInput}>Convert</button>
            </div>

                {this.props.code === 'crc' && (
                    <div className="block inputBlock">
                        <h3>CRC type:</h3>
                        <label><input type="radio" name="crctype" value="crc16" onClick={this._clickHandlerRadioButton} checked={this.state.crctype === 'crc16'} />CRC-16</label>
                        <label><input type="radio" name="crctype" value="crc16reverse" onClick={this._clickHandlerRadioButton} checked={this.state.crctype === 'crc16reverse'} />CRC-16 REVERSED</label>
                        <label><input type="radio" name="crctype" value="crc32" onClick={this._clickHandlerRadioButton} checked={this.state.crctype === 'crc32'} />CRC-32</label>
                    </div>
                )}

            <div className="block inputBlock">
                <h3>Encoded signal:</h3>
                <textarea disabled value={this.state.encodedSignal}/>
            </div>

            <div className="block inputBlock">
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

                 <div className="block outputBlock">
                    <div className="block inputBlock">
                        <b>Errors found:</b>
                        <textarea disabled value={this.state.outputSignalErr}/>
                    </div>
                    {this.props.code !== 'parity' && (
                        <div className="block inputBlock">
                            <b>Errors fixed:</b>
                            <textarea disabled value={this.state.outputSignalFix}/>
                        </div>
                    )}
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
