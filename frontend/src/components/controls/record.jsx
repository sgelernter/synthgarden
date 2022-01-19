import React from 'react';
import * as Tone from 'tone';

class Record extends React.Component {
  constructor(props) {
    super(props)
    const recorder = new Tone.Recorder()
    const synth = new Tone.Synth().connect(recorder);
    this.state = {
      recorder,
      recording: false,
      url: ''
    }
    synth.toDestination();
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);

  }

  startRecording() {
    this.state.recorder.start();
    this.setState({ recording: true })
  }

  stopRecording() {
    // this.state.recorder.stop();
    const recording = this.state.recorder.stop();
    const url = URL.createObjectURL(recording)
    this.setState({
      url,
      recording: false
    });
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
        <audio src={this.state.url} controls></audio>
        {recordingButton}
      </>
    )
  }
}

export default Record;