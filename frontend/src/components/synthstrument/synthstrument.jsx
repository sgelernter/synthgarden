/*
♡ BROWSER SYNTH INSTRUMENT ♡
*/
import * as Tone from 'tone';
import Oscillator1 from './osc_1';
// import Oscillator2 from './osc_2';
import React from 'react'
import '../../assets/stylesheets/synthstrument.scss';
import FXBank from './fx_bank';

class Synthstrument extends React.Component{

    constructor(props){
        super(props);
        const eq3 = new Tone.EQ3().toDestination();
        const simpleSynth = new Tone.Synth().connect(eq3);
        simpleSynth.volume.value = -20;
        const oscillator1 = simpleSynth.oscillator;
        oscillator1.type = 'pwm';
        const envelope = simpleSynth.envelope;
        envelope.attackCurve = "linear";
        envelope.attack = .2;
        const pitches = {
            z: 'C4',
            x: 'D4',
            c: 'E4',
            v: 'F4',
            b: 'G4',
            n: 'C5'
        }
        this.state = {
            contextStarted: 'false',
            envelope,
            synth1: simpleSynth,
            pitches,
            eq3,
            oscillator1,
            signalChain: []
        }
        this.instantiateAudioContext = this.instantiateAudioContext.bind(this);
        this.clickKey = this.clickKey.bind(this);
        this.pressKey = this.pressKey.bind(this);
        this.releaseKey = this.releaseKey.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.updateSlider = this.updateSlider.bind(this);
        this.changeOctave = this.changeOctave.bind(this);
        this.connectFX = this.connectFX.bind(this);
        this.disconnectFX = this.disconnectFX.bind(this);
    }

    setVolume(e){
        this.state.synth1.volume.value = parseInt(e.target.value);
    }

    instantiateAudioContext(e){
        if (this.state.contextStarted === 'false') {
            Tone.start().then(() => {
                console.log('Audio context has started');
                // debugger
                this.state.oscillator1.start();
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
        this.state.oscillator1.frequency.value = e.target.id;
        // this.oscillator2.frequency.value = e.target.id;
        this.state.envelope.triggerAttackRelease("2t");
    }

    pressKey(e){
        this.state.oscillator1.frequency.value = this.state.pitches[e.key];
        // this.oscillator2.frequency.value = this.pitches[e.key];
        this.state.envelope.triggerAttack();
        document.getElementById(this.state.pitches[e.key]).className = 'active';
    }
    
    releaseKey(e){
        this.state.envelope.triggerRelease();
        document.getElementById(this.state.pitches[e.key]).className = 'key';
    }

    updateSlider(type){
        return e => {
            if (['attack', 'sustain', 'release'].includes(type)) {
                const updateEnv = this.state.envelope;
                updateEnv[type] = e.target.value;
                this.setState({
                    envelope: updateEnv
                })
            } else if (type === 'portamento') {
                this.state.synth1.portamento = e.target.value;
                this.setState({
                    synth1: this.state.synth1
                })
            } else if (type === 'eq') {
                switch (e.target.className) {
                    case 'low':
                        this.state.eq3.low.value = e.target.value;
                        break;
                    case 'mid':
                        this.state.eq3.mid.value = e.target.value;
                        break;
                    case 'high':
                        this.state.eq3.high.value = e.target.value;
                        break;
                }
                this.setState({
                    eq3: this.state.eq3
                })
            }
        }
    }

    changeOctave(e){
        let octMod;
        e.target.className === 'oct-up' ? octMod = 1 : octMod = -1;
        const letters = ['z', 'x', 'c', 'v', 'b', 'n'];
        const newPitches = {};
        const origPitches = Object.values(this.state.pitches);
        origPitches.forEach ((pitch, idx) => {
            const pitchLetter = pitch.slice(0, -1);
            const newOct = parseInt(pitch.slice(-1)) + octMod;
            newPitches[letters[idx]] = pitchLetter + newOct;
        });
        this.setState({
            pitches: newPitches
        })
    }

    connectFX(effectNode){
        const destination = Tone.getDestination();
        let prevLastNode;
        this.state.signalChain.length === 0 ? prevLastNode = this.state.eq3 : prevLastNode = this.state.signalChain.slice(-1)[0];
        destination.disconnect(prevLastNode);
        prevLastNode.chain(effectNode, destination);
        this.setState({
            signalChain: this.state.signalChain.push(effectNode)
        });
    }

    disconnectFX(effectNode){
        const destination = Tone.getDestination();
        let newLastNode;
        this.state.signalChain.length === 1 ? newLastNode = this.state.eq3 : newLastNode = this.state.signalChain[0];
        destination.disconnect(effectNode);
        newLastNode.connect(destination);
        this.setState({
            signalChain: this.state.signalChain.slice(0, -1)
        });
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
                            < Oscillator1 oscillator={this.state.oscillator1}/>
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
                                    <input type="range" value={this.state.envelope.sustain} max="1" step=".1" onChange={this.updateSlider('sustain')}/>
                                </label>
                                <label>
                                    Release
                                    <input type="range" value={this.state.envelope.release} max="5" step=".1" onChange={this.updateSlider('release')}/>
                                </label>
                            </div>
                            <div className="octave-shift" onClick={this.changeOctave}>
                                <button className="oct-up">
                                    Oct. Up
                                </button>
                                <button className="oct-down">
                                    Oct. Down
                                </button>
                            </div>
                        </div>
                        {/* <div className="osc-box 2"> */}
                            {/* < Oscillator2 oscillator={this.oscillator2}/> */}
                        {/* </div> */}
                        <div className="post-FX">
                                <div className="eq3">
                                    <label>
                                        Low
                                        <input type="range" value={this.state.eq3.low.value} 
                                            min="-12" 
                                            max="12" 
                                            step=".5" 
                                            onChange={this.updateSlider('eq')} 
                                            className="low" />
                                    </label>
                                    <label>
                                        Mid
                                        <input type="range" value={this.state.eq3.mid.value} 
                                            min="-12" 
                                            max="12" 
                                            step=".5" 
                                            onChange={this.updateSlider('eq')} 
                                            className="mid" />
                                    </label>
                                    <label>
                                        High
                                        <input type="range" value={this.state.eq3.high.value} 
                                            min="-12" 
                                            max="12" 
                                            step=".5" 
                                            onChange={this.updateSlider('eq')} 
                                            className="high" />
                                    </label>
                                </div>
                                < FXBank />
                        </div>
                    </div>
                    <div className="keys-bar">
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