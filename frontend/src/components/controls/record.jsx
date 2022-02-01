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
    this.state.recorder.start();
    this.setState({
      recording: true
    })
  }

  stopRecording() {
    let clip;
    setTimeout(async () => {
      clip = await this.state.recorder.stop();
      var reader = new FileReader();
      let blobToBase64 = reader.readAsDataURL(clip);
      this.setState({
        url: reader.readAsDataURL(clip),
        recording: false
      })
    }, 500)
    
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
        download = <Link to={`/${this.state.url}`} className="download-link" target="_blank">Download</Link>        
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