import React from "react";
import * as Tone from 'tone';

class Harmonics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distortion: this.props.distortNode,
            bitCrush: this.props.crushNode,
            currentHarmonics: 'distortion'
        }
        this.toggleFX = this.toggleFX.bind(this);
        this.updateHarmonics = this.updateHarmonics.bind(this);
    }

    toggleFX(e){
        let harmonicNode;
        this.state.currentHarmonics === 'distortion' ? harmonicNode = this.state.distortion : harmonicNode = this.state.bitCrush;
        if (e.target.className === 'switch off') {
            e.target.className = 'switch on';
            this.props.connectFX(harmonicNode);                                       
            document.getElementById('distortion').className = 'harmonics on';
        } else {
            e.target.className = 'switch off';
            this.props.disconnectFX(harmonicNode);
            document.getElementById('distortion').className = 'harmonics off';
        }
    }

    updateHarmonics(e){
        this.setState({
            currentHarmonics: e.target.value
        })
        const distortBox = document.getElementById('distortion-controls');
        const crushBox = document.getElementById('crush-controls');
        if (document.getElementById('distortion').className === 'harmonics on') {
            let harmonicNode;
            let outgoingNode;
            if (e.target.value === 'distortion') {
                harmonicNode = this.state.distortion;
                outgoingNode = this.state.bitCrush;
            } else {
                harmonicNode = this.state.bitCrush;
                outgoingNode = this.state.distortion;
            } 
            this.props.disconnectFX(outgoingNode);
            this.props.connectFX(harmonicNode);
        }
        if (e.target.value === 'distortion') {
            crushBox.className = 'crush invisible';
            distortBox.className = 'distortion visible';
        } else {
            crushBox.className = 'crush visible';
            distortBox.className = 'distortion invisible';
        }
    }

    render() {
        return (
            <div className="harmonics off" id="distortion">
                <label>
                    DISTORTION
                    <input type="checkbox" className="switch off" onChange={this.toggleFX} id="harmonics-controller"/>
                    <select name="distortType" onChange={this.updateHarmonics} defaultValue='distortion' id="harmonics-selector">
                            <option value='distortion'>Distortion</option>
                            <option value='bitcrush'>Bit Crusher</option>
                        </select>
                    <div className="distortion visible" id="distortion-controls">
                        <label>
                            Amount
                            <input type="range" value={this.state.distortion.distortion} 
                                min="0" 
                                max="1" 
                                step=".1" 
                                onChange={this.props.updatePatch('distortion')} 
                                className="distortion" />
                        </label>
                    </div>
                    <div className="crush invisible" id="crush-controls">
                        <label>
                            Amount
                            <input type="range" value={this.state.bitCrush.wet.value} 
                                min="0" 
                                max="1" 
                                step=".1" 
                                onChange={this.props.updatePatch('bitcrush')} 
                                className="crusher-wet" />
                        </label>
                        <label>
                            Crusher Depth
                            <input type="range" value={this.state.bitCrush.bits.value} 
                                min="4" 
                                max="16" 
                                step=".25" 
                                onChange={this.props.updatePatch('bitcrush')} 
                                className="bit-depth" />
                        </label>
                    </div>
                </label>
            </div>
        )
    }
}

export default Harmonics;