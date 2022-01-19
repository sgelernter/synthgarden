import React from "react";
import * as Tone from 'tone';

class Harmonics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distortion: this.props.distortNode
        }
        this.toggleFX = this.toggleFX.bind(this);
    }

    toggleFX(e){
        if (e.target.className === 'switch off') {
            e.target.className = 'switch on';
            this.props.connectFX(this.state.distortion);
            document.getElementById('distortion').className = 'harmonics on';
        } else {
            e.target.className = 'switch off';
            this.props.disconnectFX(this.state.distortion);
            document.getElementById('distortion').className = 'harmonics off';
        }
    }

    render() {
        return (
            <div className="harmonics off" id="distortion">
                <label>
                    DISTORTION
                    <input type="checkbox" className="switch off" onChange={this.toggleFX}/>
                    <div>
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
                </label>
            </div>
        )
    }
}

export default Harmonics;