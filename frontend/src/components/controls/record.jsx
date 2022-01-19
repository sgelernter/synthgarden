import React from 'react';
import { Link } from 'react-router-dom';
import * as Tone from 'tone';

class Record extends React.Component {
  constructor(props) {
    super(props)
    const recorder = new Tone.Recorder()
    const synth = new Tone.Synth().connect(recorder);
    this.state = {
      recorder,
      recording: false,
      url: '',
      synth
    }
    synth.toDestination();
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);

  }

  startRecording() {
    // TEST NOIZE
    this.state.synth.triggerAttackRelease("C3", 0.5);
    this.state.synth.triggerAttackRelease("C4", 0.5, "+1");
    this.state.synth.triggerAttackRelease("C5", 0.5, "+2");
    // DELETE ABOVE

    this.state.recorder.start();
    this.setState({
      recording: true
    })
  }

  stopRecording() {
    // this.state.recorder.stop();
    // debugger
    // const recording = this.state.recorder.stop();
    // debugger
    // const url = URL.createObjectURL(recording)
    // debugger
    // // console.log(url)
    // this.setState({
    //   url,
    //   recording: false
    // });
    let clip, clipUrl;
    setTimeout(async () => {
      clip = await this.state.recorder.stop();
      clipUrl = URL.createObjectURL(clip);

      // console.log(clipUrl)

      this.setState({
        url: clipUrl,
        recording: false
      })
    }, 1000)
    
  }

  render() {
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

      let download;
      this.state.url ?
      (
        download = <Link to={this.state.url} className="download-link">Download</Link>
      ) : (
        download = null
      )

    return (
      <>
        {recordingButton}
        <audio src={this.state.url} controls></audio>
        {download}
      </>
    )
  }
}

export default Record;