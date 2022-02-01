import React from "react";
import { Oscilloscope } from "webaudio-oscilloscope";
import * as Tone from "tone";

class Scope extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prev){
        if (this.props.contextStarted !== prev.contextStarted && this.props.contextStarted === 'true') {
            const context = Tone.getContext();
            const canvas = document.getElementById('oscilloscope');
            this.gainNode = new Tone.Gain(2);
            this.props.lastLink.connect(this.gainNode);
            this.osc = new Oscilloscope(context, this.gainNode, canvas);
            const canvasContext = this.osc.cctx;
            canvasContext.shadowBlur = 8;
            canvasContext.lineWidth = 1.5;
            canvasContext.strokeStyle = '#c4ffc4';
            canvasContext.shadowColor = '#229e15';
            canvasContext.globalAlpha = 1.5;
            this.osc.start();
            if (this.props.lastLink !== prev.lastLink) {
                prev.lastLink.disconnect(this.gainNode);
                this.props.lastLink.connect(this.gainNode);
            }
        } 
    }
    
    render(){
        return (
            <div className="oscilloscope-container">
                <canvas id="oscilloscope" width="150px" height="150px"/>
            </div>
        )
    }
}

export default Scope;

