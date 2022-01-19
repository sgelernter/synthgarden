import React from "react";
import * as Tone from 'tone';

class Mods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chorus: this.props.chorusNode,
            trem: this.props.tremoloNode
        }
        this.toggleFX = this.toggleFX.bind(this);
    }

    toggleFX(e){
        if (e.target.className === 'switch off') {
            e.target.className = 'switch on';
            this.state.chorus.start();
            this.state.trem.start();
            this.props.connectFX(this.state.chorus);
            this.props.connectFX(this.state.trem);
            document.getElementById('mods').className = 'mods on';
        } else {
            e.target.className = 'switch off';
            this.state.chorus.stop();
            this.state.trem.stop();
            this.props.disconnectFX(this.state.trem);
            this.props.disconnectFX(this.state.chorus);
            document.getElementById('mods').className = 'mods off';
        }
    }


    render() {
        return (
            <div className="mods off" id="mods">
                <label>
                    MODS  
                    <input type="checkbox" className="switch off" onChange={this.toggleFX}/>
                </label>
                <div className="chorus">
                    <h4>Chorus:</h4>
                    <label>
                        LFO
                        <input type="range" value={this.state.chorus.frequency.value} 
                            min="0" 
                            max="1" 
                            step=".1" 
                            onChange={this.props.updatePatch('chorus')} 
                            className="LFO" />
                    </label>
                    <label>
                        Delay
                        <input type="range" value={this.state.chorus.delayTime.value} 
                            min="0" 
                            max="20" 
                            step="2" 
                            onChange={this.props.updatePatch('chorus')} 
                            className="delay" />
                    </label>
                    <label>
                        Depth
                        <input type="range" value={this.state.chorus.depth.value} 
                            min="0" 
                            max="1" 
                            step=".1" 
                            onChange={this.props.updatePatch('chorus')} 
                            className="chorus-depth" />
                    </label>
                </div>
                <div className="tremolo">
                    <h4>Tremolo:</h4>
                    <label>
                            Freq
                            <input type="range" value={this.state.trem.frequency.value} 
                                min="0" 
                                max="50" 
                                step="1" 
                                onChange={this.props.updatePatch('tremolo')} 
                                className="frequency" />
                        </label>
                        <label>
                            Depth
                            <input type="range" value={this.state.trem.depth.value} 
                                min="0" 
                                max="1" 
                                step=".05" 
                                onChange={this.props.updatePatch('tremolo')} 
                                className="trem-depth" />
                        </label>                    
                </div>
            </div>
        )
    }
}

export default Mods;