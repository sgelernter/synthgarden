import React from 'react';
import * as Tone from 'tone';

class Record extends React.Component {
  constructor(props) {
    super(props)
    const synth = new Tone.Synth();
    const recorder = new Tone.Recorder()
    this.state = {
      recorder,
      recording: false
    }
    // const actx = Tone.context;
    // console.log(actx);
    synth.toDestination();
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);

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
    // this.state.recorder.start();
    this.setState({ recording: true })
  }

  stopRecording() {
    // this.state.recorder.stop();
    this.setState({ recording: false })
  }

  render() {
    // SWITCH RECORDING BUTTON - START / STOP
    let recordingButton;
    this.state.recording ?
      (
        recordingButton = <button
                            className="record-btn"
                            onClick={this.stopRecording}
                          >
                            STOP RECORDING
                          </button>
      ) : (
        recordingButton = <button
                            className="record-btn"
                            onClick={this.startRecording}
                          >
                            START RECORDING
                          </button>
      )



    return (
      <>
        <audio controls></audio>
        {recordingButton}
      </>
    )
  }
}

export default Record;