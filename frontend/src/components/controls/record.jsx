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
    // TEST
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
    // let clip, clipUrl;
    let clip;
    // debugger
    setTimeout(async () => {
      clip = await this.state.recorder.stop();
      // debugger
      var reader = new FileReader();
      let blobToBase64 = reader.readAsDataURL(clip); 
      console.log(blobToBase64)
      // clipUrl = URL.createObjectURL(clip);
      this.setState({
        // url: clipUrl,
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
        // blob:http://localhost:3000/0ac0faca-0700-4267-bf8a-8b8cc5c70d61
        // test on heroku / fix to instant download link
        
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