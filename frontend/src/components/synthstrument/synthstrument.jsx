/*
♡ BROWSER SYNTH INSTRUMENT ♡
*/
import * as Tone from 'tone';
import Oscillator1 from './osc_1';
import Oscillator2 from './osc_2';
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
        this.vol = new Tone.Volume(-30).toDestination();
        this.envelope.connect(this.vol);
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
        this.setVolume = this.setVolume.bind(this);
    }

    setVolume(e){
        // debugger
        this.vol.volume.value = parseInt(e.target.value);
        // console.log(this.vol);
    }

    instantiateAudioContext(e){
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
            e.target.className = 'power-button on';
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
            <div className="synthstrument-container">
                <div className="synthstrument">
                    <div className="label">
                        ✨ QT Synthstrument Here ✨
                        <button className="power-button off" onClick={this.instantiateAudioContext}>
                            POWER
                        </button>
                    </div>
                    <div className="oscillators-bar">
                        < Oscillator1 />
                        < Oscillator2 />
                    </div>
                    <div className="keys-bar">
                        <div className="post-FX">

                        </div>
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
                        <label>Volume
                            <div className="volume" onClick={this.setVolume}>
                                <label>
                                    low
                                    <input type="radio" value="-30" name="volume"/>
                                </label>
                                <label>
                                    med
                                    <input type="radio" value="-20" name="volume"/>
                                </label>
                                <label>
                                    high
                                    <input type="radio" value="-6" name="volume"/>
                                </label>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}

export default Synthstrument;