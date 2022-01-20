/*
♡ BROWSER SYNTH INSTRUMENT ♡
*/
import * as Tone from 'tone';
import Oscillator1 from './osc_1';
// import Oscillator2 from './osc_2';
import React from 'react'
import '../../assets/stylesheets/synthstrument.scss';
import FXBank from './fx_bank';
import Record from './record';

class Synthstrument extends React.Component{

    constructor(props){
        super(props);
        const eq3 = new Tone.EQ3().toDestination();
        const simpleSynth = new Tone.Synth().connect(eq3);
        const oscillator1 = simpleSynth.oscillator;
        const envelope = simpleSynth.envelope;
        const chorus = new Tone.Chorus();
        const tremolo = new Tone.Tremolo();
        const distortion = new Tone.Distortion();
        const bitCrush = new Tone.BitCrusher();
        const feedDelay = new Tone.FeedbackDelay();
        const pongDelay = new Tone.PingPongDelay();
        simpleSynth.volume.value = -20;
        oscillator1.type = 'pwm';
        envelope.attackCurve = "linear";
        envelope.attack = .2;
        const pitches = {a: 'C4', w: 'C#4', s: 'D4', e: 'D#4', d: 'E4', f: 'F4',
            t: 'F#4', g: 'G4', y: 'G#4', h: 'A4', u: 'A#4', j: 'B4', k: 'C5'}
        this.signalChain = [];
        this.state = {
            contextStarted: 'false',
            synth1: simpleSynth,
            currentPatch: this.props.currentPatch,
            pitches,
            octave: 0,
            envelope,
            eq3,
            oscillator1,
            chorus,
            tremolo,
            distortion,
            bitCrush,
            feedDelay,
            pongDelay,
            patchName: 'untitled patch',
            currentName: 'no patch selected'
        }
        this.instantiateAudioContext = this.instantiateAudioContext.bind(this);
        this.clearPatchName = this.clearPatchName.bind(this);
        this.updatePatchName = this.updatePatchName.bind(this);
        this.clickKey = this.clickKey.bind(this);
        this.pressKey = this.pressKey.bind(this);
        this.releaseKey = this.releaseKey.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.updatePatch = this.updatePatch.bind(this);
        this.changeOctave = this.changeOctave.bind(this);
        this.connectFX = this.connectFX.bind(this);
        this.disconnectFX = this.disconnectFX.bind(this);
        this.savePatch = this.savePatch.bind(this);
        this.loadPatch = this.loadPatch.bind(this);
    }

    // UPDATE SELECTED PATCH
    componentDidUpdate(prevProps){
        if (this.props.currentPatch !== prevProps.currentPatch) {
            this.loadPatch();
        }
    }

    setVolume(e){
        this.state.synth1.volume.value = e.target.value;
        this.setState({
            synth1: this.state.synth1
        })
    }

    instantiateAudioContext(e){
        if (this.state.contextStarted === 'false') {
            Tone.start().then(() => {
                this.state.oscillator1.start();
            }).then(() => {
                document.addEventListener("keydown", this.pressKey);
                document.addEventListener("keyup", this.releaseKey);
            });
            this.setState({
                contextStarted: 'true'
            })
            e.target.className = 'power-button on';
        } else {
            this.state.oscillator1.stop();
            e.target.className = 'power-button off';
            this.setState({
                contextStarted: 'false'
            })
        }
    }
    //  KEY CONTROLLER HANDLERS
    clickKey(e){
        this.state.oscillator1.frequency.value = e.target.id;
        this.state.envelope.triggerAttackRelease("2t");
    }

    pressKey(e){
        this.state.oscillator1.frequency.value = this.state.pitches[e.key];
        this.state.envelope.triggerAttack();
        document.getElementById(this.state.pitches[e.key]).className = 'active';
    }
    
    releaseKey(e){
        this.state.envelope.triggerRelease();
        document.getElementById(this.state.pitches[e.key]).className = 'key';
    }

    // PATCH CONTROLS
    updatePatchName(e){
        this.setState({
            patchName: e.target.value
        })
    }

    clearPatchName(e){
        if (this.state.patchName === 'untitled patch') this.setState({patchName: ''});
    }

    savePatch(){
        const modsOn = document.getElementById('mods').className === 'mods on';
        const harmonicsOn = document.getElementById('distortion').className === 'harmonics on';
        const delaysOn = document.getElementById('delay').className === 'delays on';
        let selectedDelay;
        let selectedHarmonics;
        document.getElementById('distortion-controls').className === 'distortion visible' ? selectedHarmonics = 'distortion' : selectedHarmonics = 'bitCrusher';
        document.getElementById('feedback-controls').className === 'feedback-delay visible' ? selectedDelay = 'feedback' : selectedDelay = 'pong';

        const patchData = {
            name: this.state.patchName,
            user: this.props.currentUserId,
            oscillator: {
                osctype: this.state.oscillator1.type,
                attack: this.state.envelope['attack'],
                sustain: this.state.envelope['sustain'],
                release: this.state.envelope['release'],
            },
            octave: this.state.octave,
            eq: {
                high: this.state.eq3.high.value,
                mid: this.state.eq3.mid.value,
                low: this.state.eq3.low.value
            },
            mods: modsOn,
            chorus: {
                LFO: this.state.chorus.frequency.value,
                delay: this.state.chorus.delayTime,
                depth: this.state.chorus.depth
            },
            tremolo: {
                frequency: this.state.tremolo.frequency.value,
                depth: this.state.tremolo.depth.value
            },
            harmonics: harmonicsOn,
            selectedHarmonics,
            distortion: {
                amt: this.state.distortion.wet.value
            },
            bitCrusher: {
                bitDepth: this.state.bitCrush.bits.value,
                amount: this.state.bitCrush.wet.value
            },
            delay: delaysOn,
            selectedDelay,
            feedback: {
                time: this.state.feedDelay.delayTime.value,
                fb: this.state.feedDelay.feedback.value,
                amt: this.state.feedDelay.wet.value
            },
            pingPong: {
                time: this.state.pongDelay.delayTime.value,
                fb: this.state.pongDelay.feedback.value,
                amt: this.state.pongDelay.wet.value
            }
        }
        this.props.savePatch(patchData);
    }
    // ASSIGN NEW NODE SETTINGS AND SET STATE - NEED TO WRITE ON/OFF LOGIC FOR FX & OCTAVES
    loadPatch(){
        this.state.oscillator1.type = this.props.currentPatch.oscillator.osctype;
        this.state.envelope['attack'] = this.props.currentPatch.oscillator.attack;
        this.state.envelope['sustain'] = this.props.currentPatch.oscillator.sustain;
        this.state.envelope['release'] = this.props.currentPatch.oscillator.release;
        this.state.octave = this.props.currentPatch.octave;
        this.state.eq3.high.value = this.props.currentPatch.eq.high;
        this.state.eq3.mid.value = this.props.currentPatch.eq.mid;
        this.state.eq3.low.value = this.props.currentPatch.eq.low;
        this.state.chorus.frequency.value = this.props.currentPatch.chorus.LFO;
        this.state.chorus.delayTime = this.props.currentPatch.chorus.delay;
        this.state.chorus.depth = this.props.currentPatch.chorus.depth;
        this.state.tremolo.frequency.value = this.props.currentPatch.tremolo.frequency;
        this.state.tremolo.depth.value = this.props.currentPatch.tremolo.depth;
        this.state.distortion.wet.value = this.props.currentPatch.distortion.amt; 
        this.state.bitCrush.bits.value = this.props.currentPatch.bitCrusher.bitDepth;
        this.state.bitCrush.wet.value = this.props.currentPatch.bitCrusher.amount;
        this.state.feedDelay.delayTime.value = this.props.currentPatch.feedback.time;
        this.state.feedDelay.feedback.value = this.props.currentPatch.feedback.fb;
        this.state.feedDelay.wet.value = this.props.currentPatch.feedback.amt;
        this.state.pongDelay.delayTime.value = this.props.currentPatch.pingPong.time;
        this.state.pongDelay.feedback.value = this.props.currentPatch.pingPong.fb;
        this.state.pongDelay.wet.value = this.props.currentPatch.pingPong.amt;
        this.setState({
            currentPatch: this.props.currentPatch,
            currentName: this.props.currentPatch.name,
            oscillator1: this.state.oscillator1,
            envelope: this.state.envelope,
            eq3: this.state.eq3, 
            chorus: this.state.chorus, 
            tremolo: this.state.tremolo, 
            distortion: this.state.distortion, 
            bitCrush: this.state.bitCrush, 
            feedDelay: this.state.feedDelay, 
            pongDelay: this.state.pongDelay
        })
    }

    // SYNTH SETTINGS CHANGE TREE
    updatePatch(type){
        return e => {
            switch (type) {
                case 'attack':
                case 'sustain':
                case 'release':
                    const updateEnv = this.state.envelope;
                    updateEnv[type] = e.target.value;
                    this.setState({
                        envelope: updateEnv
                    })
                    break;
                case 'eq':
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
                    break;   
                case 'chorus':
                    switch (e.target.className) {
                        case 'LFO':
                            this.state.chorus.frequency.value = e.target.value;
                            break;
                        case 'delay':
                            this.state.chorus.delayTime = e.target.value;
                            break;
                        case 'chorus-depth':
                            this.state.chorus.depth = e.target.value;
                            break;
                    }
                    this.setState({
                        chorus: this.state.chorus
                    })
                case 'tremolo':
                    console.log(this.state.tremolo);
                    switch (e.target.className) {
                        case 'frequency':
                            this.state.tremolo.frequency.value = e.target.value;
                            break;
                        case 'trem-depth':
                            this.state.tremolo.depth.value = e.target.value;
                            break;
                    }
                    console.log(this.state.tremolo);      
                    this.setState({
                        tremolo: this.state.tremolo
                    })
                    break;
                case 'distortion':
                    this.state.distortion.distortion = e.target.value;
                    this.setState({
                        distortion: this.state.distortion
                    })
                    break;
                case 'bitcrush':
                    // debugger
                    if (e.target.className === 'crusher-wet') {
                        this.state.bitCrush.wet.value = e.target.value;
                    } else {
                        this.state.bitCrush.bits.value = e.target.value;
                    }
                    this.setState({
                        bitCrush: this.state.bitCrush
                    })
                    break;
                case 'feedback-delay':
                    switch (e.target.className) {
                        case 'delay-time':
                            this.state.feedDelay.delayTime.value = e.target.value;
                            break;
                        case 'feedback':
                            this.state.feedDelay.feedback.value = e.target.value;
                            break;
                        case 'wet-dry':
                            this.state.feedDelay.wet.value = e.target.value;
                            break;
                    }
                    this.setState({
                        feedDelay: this.state.feedDelay
                    })
                    break;
                case 'pong-delay':
                    switch (e.target.className) {
                        case 'delay-time':
                            this.state.pongDelay.delayTime.value = e.target.value;
                            break;
                        case 'feedback':
                            this.state.pongDelay.feedback.value = e.target.value;
                            break;
                        case 'wet-dry':
                            this.state.pongDelay.wet.value = e.target.value;
                            break;
                    }
                    this.setState({
                        pongDelay: this.state.pongDelay
                    })
                    break;
            }
        }
    }

    changeOctave(e){
        let octMod;
        e.target.className === 'oct-up' ? octMod = 1 : octMod = -1;
        const letters = Object.keys(this.state.pitches);
        const newPitches = {};
        const origPitches = Object.values(this.state.pitches);
        if (this.state.octave + octMod <= 3 && this.state.octave + octMod >= -3) {
            origPitches.forEach ((pitch, idx) => {
                const pitchLetter = pitch.slice(0, -1);
                const newOct = parseInt(pitch.slice(-1)) + octMod;
                newPitches[letters[idx]] = pitchLetter + newOct;
            });
            this.setState({
                pitches: newPitches,
                octave: (this.state.octave + octMod)
            })
        }
    }

    // CONNECT AND DISCONNECT EFFECTS NODES
    connectFX(effectNode){
        const destination = Tone.getDestination();
        let prevLastNode;
        this.signalChain.length === 0 ? prevLastNode = this.state.eq3 : prevLastNode = this.signalChain.slice(-1)[0];
        prevLastNode.disconnect(destination);
        prevLastNode.chain(effectNode, destination);
        this.signalChain.push(effectNode);
    }

    disconnectFX(effectNode){
        const destination = Tone.getDestination();
        if (this.signalChain.length === 1) {
            effectNode.disconnect(destination);
            this.signalChain = [];
            this.state.eq3.connect(destination);

        } else {
            this.signalChain.forEach (node => node.disconnect());
            const idx = this.signalChain.indexOf(effectNode);
            const newChain = this.signalChain.slice(0, idx).concat(this.signalChain.slice(idx + 1));
            this.state.eq3.chain(...newChain, destination);
            this.signalChain = newChain;
        }
    }

    render(){
        return (
            <div className="synthstrument-container">
                <div className="synthstrument">
                    <div className="label">
                        <button className="power-button off" onClick={this.instantiateAudioContext}>
                            POWER
                        </button>
                        ✨ QT Synthstrument Here ✨
                    </div>
                    <div className="main-controls box">
                        <div className="patch-interface">
                            <input type="text" value={this.state.patchName} onClick={this.clearPatchName} onChange={this.updatePatchName} />
                            <button onClick={this.savePatch}>
                                save patch settings
                            </button>
                            <p>
                                Current patch: {this.state.currentName}
                            </p>
                        </div>
                        <div className="main-synth box">
                            <div className="oscillators-bar">
                                <div className="osc-box 1">
                                    < Oscillator1 oscillator={this.state.oscillator1}/>
                                    <div className="env-controls">
                                        <label>
                                            Attack
                                            <input type="range" value={this.state.envelope.attack} max="2" step=".05" onChange={this.updatePatch('attack')}/>
                                        </label>
                                        <label>
                                            Sustain
                                            <input type="range" value={this.state.envelope.sustain} max="1" step=".1" onChange={this.updatePatch('sustain')}/>
                                        </label>
                                        <label>
                                            Release
                                            <input type="range" value={this.state.envelope.release} max="5" step=".05" onChange={this.updatePatch('release')}/>
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
                                <div className="post-FX">
                                        <div className="eq3">
                                            <label>
                                                Low
                                                <input type="range" value={this.state.eq3.low.value} 
                                                    min="-12" 
                                                    max="12" 
                                                    step=".5" 
                                                    onChange={this.updatePatch('eq')} 
                                                    className="low" />
                                            </label>
                                            <label>
                                                Mid
                                                <input type="range" value={this.state.eq3.mid.value} 
                                                    min="-12" 
                                                    max="12" 
                                                    step=".5" 
                                                    onChange={this.updatePatch('eq')} 
                                                    className="mid" />
                                            </label>
                                            <label>
                                                High
                                                <input type="range" value={this.state.eq3.high.value} 
                                                    min="-12" 
                                                    max="12" 
                                                    step=".5" 
                                                    onChange={this.updatePatch('eq')} 
                                                    className="high" />
                                            </label>
                                        </div>
                                        < FXBank connectFX={this.connectFX} disconnectFX={this.disconnectFX} updatePatch={this.updatePatch}
                                            chorusNode={this.state.chorus}
                                            tremoloNode={this.state.tremolo}
                                            distortNode={this.state.distortion}
                                            crushNode={this.state.bitCrush}
                                            feedDelayNode={this.state.feedDelay}
                                            pongDelayNode={this.state.pongDelay}/>
                                </div>
                            </div>
                            <div className="keys-bar">
                                <ol className="keyboard" onClick={this.clickKey}>
                                    {Object.values(this.state.pitches).map ((note, idx) => (
                                        <li className="key" key={idx} id={note}>
                                            {Object.keys(this.state.pitches)[idx]}
                                            <p>
                                            {note}
                                            </p>
                                        </li>
                                    ))}
                                </ol>
                                <div className="volume" onClick={this.setVolume}>
                                    <label>Volume
                                        <input type="range" value={this.state.synth1.volume.value} onChange={this.setVolume} min="-45" max="0" step="1" />
                                    </label>
                                </div>
                                < FXBank connectFX={this.connectFX} disconnectFX={this.disconnectFX} updatePatch={this.updatePatch}
                                    chorusNode={this.state.chorus}
                                    tremoloNode={this.state.tremolo}
                                    distortNode={this.state.distortion}
                                    crushNode={this.state.bitCrush}
                                    feedDelayNode={this.state.feedDelay}
                                    pongDelayNode={this.state.pongDelay}/>

                                <Record
                                    connectFX={this.connectFX}
                                    disconnectFX={this.disconnectFX}
                                    saveSample={this.props.saveSample}
                                    currentUserId={this.props.currentUserId}
                                    className="record"
                                />
                        </div>
                    </div>
                    <div className="keys-bar">
                        <ol className="keyboard" onClick={this.clickKey}>
                            {Object.values(this.state.pitches).map ((note, idx) => (
                                <li className="key" key={idx} id={note}>
                                    {Object.keys(this.state.pitches)[idx]}
                                    <p>
                                    {note}
                                    </p>
                                </li>
                            ))}
                        </ol>
                        <div className="volume" onClick={this.setVolume}>
                            <label>Volume
                                <input type="range" value={this.state.synth1.volume.value} onChange={this.setVolume} min="-45" max="0" step="1" />
                            </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Synthstrument;