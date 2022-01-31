import React from "react";
import * as Tone from 'tone';

class Delays extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: this.props.feedDelayNode,
            pingPong: this.props.pongDelayNode,
            currentDelay: 'feedback'
        }
        this.toggleFX = this.toggleFX.bind(this);
        this.updateDelay = this.updateDelay.bind(this);
    }

    toggleFX(e){
        let delayNode;
        this.state.currentDelay === 'feedback' ? delayNode = this.state.feedback : delayNode = this.state.pingPong;
        if (e.target.className === 'switch off') {
            e.target.className = 'switch on';
            this.props.connectFX(delayNode);
            document.getElementById('delay').className = 'delays on';
        } else {
            e.target.className = 'switch off';
            this.props.disconnectFX(delayNode);
            document.getElementById('delay').className = 'delays off';
        }
    }

    updateDelay(e){
        this.setState({
            currentDelay: e.target.value
        })
        const feedBox = document.getElementById('feedback-controls');
        const pongBox = document.getElementById('pong-controls');
        if (document.getElementById('delay').className === 'delays on') {
            let delayNode;
            let outgoingNode;
            if (e.target.value === 'feedback') {
                delayNode = this.state.feedback;
                outgoingNode = this.state.pingPong;
            } else {
                delayNode = this.state.pingPong;
                outgoingNode = this.state.feedback;
            } 
            this.props.disconnectFX(outgoingNode);
            this.props.connectFX(delayNode);
        }
        if (e.target.value === 'feedback') {
            pongBox.className = 'pong-delay invisible';
            feedBox.className = 'feedback-delay visible';
        } else {
            pongBox.className = 'pong-delay visible';
            feedBox.className = 'feedback-delay invisible';
        }
    }

    render() {
        return (
            <div className="delays off" id="delay">
                <label className="module-label">
                    DELAY
                    <input type="checkbox" className="switch off" onChange={this.toggleFX} id="delays-controller"/>
                        <select name="delayType" onChange={this.updateDelay} defaultValue='feedback' id="delays-selector">
                            <option value='feedback'>Feedback</option>
                            <option value='pong'>Ping-Pong</option>
                        </select>
                </label>
                <div className="delay-controls">
                    <div className="feedback-delay visible" id="feedback-controls">
                        <label>
                            Time
                            <input type="range" value={this.state.feedback.delayTime.value} 
                                min="0" 
                                max="1" 
                                step=".05" 
                                onChange={this.props.updatePatch('feedback-delay')} 
                                className="delay-time" />
                        </label>
                        <label>
                            Feedback
                            <input type="range" value={this.state.feedback.feedback.value} 
                                min="0" 
                                max="1" 
                                step=".1" 
                                onChange={this.props.updatePatch('feedback-delay')} 
                                className="feedback" />
                        </label>
                        <label>
                            Amount
                            <input type="range" value={this.state.feedback.wet.value} 
                                min="0" 
                                max="1" 
                                step=".1" 
                                onChange={this.props.updatePatch('feedback-delay')} 
                                className="wet-dry" />
                        </label>
                    </div>
                    <div className="pong-delay invisible" id="pong-controls">
                        <label>
                            Time
                            <input type="range" value={this.state.pingPong.delayTime.value} 
                                min="0" 
                                max="1" 
                                step=".05" 
                                onChange={this.props.updatePatch('pong-delay')} 
                                className="delay-time" />
                        </label>
                        <label>
                            Feedback
                            <input type="range" value={this.state.pingPong.feedback.value} 
                                min="0" 
                                max="1" 
                                step=".1" 
                                onChange={this.props.updatePatch('pong-delay')} 
                                className="feedback" />
                        </label>
                        <label>
                            Amount
                            <input type="range" value={this.state.pingPong.wet.value} 
                                min="0" 
                                max="1" 
                                step=".1" 
                                onChange={this.props.updatePatch('pong-delay')} 
                                className="wet-dry" />
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}

export default Delays;