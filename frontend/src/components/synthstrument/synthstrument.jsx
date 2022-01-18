/*
♡ BROWSER SYNTH INSTRUMENT ♡
*/
import * as Tone from 'tone';

import React from 'react'
import '../../assets/stylesheets/synthstrument.scss';

class Synthstrument extends React.Component{

    constructor(props){
        super(props);
        this.oscillator = new Tone.OmniOscillator();
        this.envelope = new Tone.AmplitudeEnvelope();
        this.envelope.attackCurve = "linear";
        this.envelope.attack = 1;
        this.oscillator.connect(this.envelope);
        const vol = new Tone.Volume(-6).toDestination();
        this.envelope.connect(vol);
        this.pitches = {
            z: 'C4',
            x: 'D4',
            c: 'E4',
            v: 'F4',
            b: 'G4',
            n: 'C5'
        }
        this.state = {
            contextStarted: 'false'
        }
        this.instantiateAudioContext = this.instantiateAudioContext.bind(this);
        this.clickKey = this.clickKey.bind(this);
        this.pressKey = this.pressKey.bind(this);
        this.releaseKey = this.releaseKey.bind(this);
    }

    instantiateAudioContext(){
        if (this.state.contextStarted === 'false') {
            Tone.start().then(() => {
                console.log('Audio context has started');
                this.oscillator.start();
            }).then(() => {
                document.addEventListener("keydown", this.pressKey);
                document.addEventListener("keyup", this.releaseKey);
            });
            this.setState({
                contextStarted: 'true'
            })
        }
    }

    clickKey(e){
        this.oscillator.frequency.value = e.target.id;
        this.envelope.triggerAttackRelease("2t");
    }

    pressKey(e){
        this.oscillator.frequency.value = this.pitches[e.key];
        this.envelope.triggerAttack();
        document.getElementById(this.pitches[e.key]).className = 'active';
    }
    
    releaseKey(e){
        this.envelope.triggerRelease();
        document.getElementById(this.pitches[e.key]).className = 'key';
    }

    render(){
        return (
            <div className="synthstrument-container" onClick={this.instantiateAudioContext}>
                <div className="synthstrument">
                    ✨ QT Synthstrument Here ✨
                    <ol className="keyboard" onClick={this.clickKey}>
                        <li className="key" id="C4">
                        </li>
                        <li className="key" id="D4">
                        </li>
                        <li className="key" id="E4">
                        </li>
                        <li className="key" id="F4">
                        </li>
                        <li className="key" id="G4">
                        </li>
                        <li className="key" id="C5">
                        </li>
                    </ol>
                </div>
            </div>
        )
    }
}

export default Synthstrument;