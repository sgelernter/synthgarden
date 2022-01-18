/*
♡ BROWSER SYNTH INSTRUMENT ♡
*/
import * as Tone from 'tone';
import Oscillator1 from './osc_1';
// import Oscillator2 from './osc_2';
import FXBank from './fx_bank';
import React from 'react'
import '../../assets/stylesheets/synthstrument.scss';

class Synthstrument extends React.Component{

    constructor(props){
        super(props);
        this.simpleSynth = new Tone.Synth().toDestination();
        this.simpleSynth.volume.value = -20;
        this.oscillator1 = this.simpleSynth.oscillator;
        this.oscillator1.type = 'pwm';
        // this.oscillator2 = new Tone.OmniOscillator();
        this.envelope = this.simpleSynth.envelope;
        this.envelope.attackCurve = "linear";
        this.envelope.attack = .2;
        // this.oscillator1.connect(this.envelope);
        // this.oscillator2.connect(this.envelope);
        // this.vol = new Tone.Volume(-30).toDestination();
        // this.envelope.connect(this.vol);
        this.pitches = {
            z: 'C4',
            x: 'D4',
            c: 'E4',
            v: 'F4',
            b: 'G4',
            n: 'C5'
        }
        this.state = {
            contextStarted: 'false',
            envelope: this.envelope,
            synth1: this.simpleSynth
        }
        // debugger
        this.instantiateAudioContext = this.instantiateAudioContext.bind(this);
        this.clickKey = this.clickKey.bind(this);
        this.pressKey = this.pressKey.bind(this);
        this.releaseKey = this.releaseKey.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.updateSlider = this.updateSlider.bind(this);
    }

    setVolume(e){
        this.simpleSynth.volume.value = parseInt(e.target.value);
    }

    instantiateAudioContext(e){
        if (this.state.contextStarted === 'false') {
            Tone.start().then(() => {
                console.log('Audio context has started');
                this.oscillator1.start();
                // this.oscillator2.start();
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
        this.oscillator1.frequency.value = e.target.id;
        // this.oscillator2.frequency.value = e.target.id;
        this.envelope.triggerAttackRelease("2t");
    }

    pressKey(e){
        this.oscillator1.frequency.value = this.pitches[e.key];
        // this.oscillator2.frequency.value = this.pitches[e.key];
        this.envelope.triggerAttack();
        document.getElementById(this.pitches[e.key]).className = 'active';
    }
    
    releaseKey(e){
        this.envelope.triggerRelease();
        document.getElementById(this.pitches[e.key]).className = 'key';
    }

    updateSlider(type){
        return e => {
            if (type !== 'portamento') {
                const updateEnv = this.state.envelope;
                updateEnv[type] = e.target.value;
                this.setState({
                    envelope: updateEnv
                })
            } else {
                this.state.synth1.portamento = e.target.value;
                // debugger
                this.setState({
                    synth1: this.state.synth1
                })
            }
        }
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
                        <div className="osc-box 1">
                            < Oscillator1 oscillator={this.oscillator1}/>
                            <div className="env-controls">
                                <label>
                                    Attack
                                    <input type="range" value={this.state.envelope.attack} max="2" step=".1" onChange={this.updateSlider('attack')}/>
                                </label>
                                {/* <label>
                                    Decay
                                    <input type="range" value={this.state.envelope.decay} max="2" step=".1" onChange={this.updateSlider('decay')}/>
                                </label> */}
                                <label>
                                    Sustain
                                    <input type="range" value={this.state.envelope.sustainbbz} max="1" step=".1" onChange={this.updateSlider('sustain')}/>
                                </label>
                                <label>
                                    Release
                                    <input type="range" value={this.state.envelope.release} max="5" step=".1" onChange={this.updateSlider('release')}/>
                                </label>
                                {/* <label>
                                    Glide
                                    <input type="range" value={this.state.synth1.portamento} max="3" step=".1" onChange={this.updateSlider('portamento')}/>
                                </label> */}
                            </div>
                        </div>
                        <div className="osc-box 2">
                            {/* < Oscillator2 oscillator={this.oscillator2}/> */}
                        </div>
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
                                    <input type="radio" value="-20" name="volume" defaultChecked/>
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