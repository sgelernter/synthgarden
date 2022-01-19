import React from 'react';
import * as Tone from 'tone';

class Record extends React.Component {
  constructor(props) {
    super(props)
    const synth = new Tone.Synth();
    this.state = {
      recorder: new Tone.Recorder()
    }
    // const recorder = new Tone.Recorder();
    const actx = Tone.context;
    console.log(actx);
    
    synth.toDestination();

    const notes = 'CDEFGAB'.split('').map(n => `${n}4`);
    let note = 0;
    Tone.Transport.scheduleRepeat(time => {
      if (note === 0) {
        // START RECORDING
      }
      if (note > notes.length) {
        // STOP RECORDING

        // trigger release on synth to stop making noise
        synth.triggerRelease(time)

        // stop the synth
        Tone.Transport.stop();
      } else synth.triggerAttack(notes[note], time);
      note ++;
    }, '4n');
    // Tone.Transport.start();
  }

  startRecording() {
    this.state.recorder.start();
  }

  stopRecording() {
    this.state.recorder.stop();
  }

  render() {
    // SWITCH RECORDING BUTTON - START / STOP


    return (
      <>
        <audio controls></audio>
        <button onClick={this.startRecording}>START</button>
        <button onClick={this.stopRecording}>STOP</button>
      </>
    )
  }
}

export default Record;