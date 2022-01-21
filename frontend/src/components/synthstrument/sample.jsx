import React from 'react';
// import { Link } from 'react-router-dom';
// import * as Tone from 'tone';
import '../../assets/stylesheets/synthstrument.scss'
import start from '../../assets/images/start-rec.png'
import stop from '../../assets/images/stop-rec.png'

class Sample extends React.Component {
    constructor(props) {
      super(props);
      // const recorder = new Tone.Recorder()
      // const synth = new Tone.Synth().connect(recorder);
      this.state = {
          // recorder,
          recording: false,
          file: '',
          // synth,
          updating: false,
          sampleName: '',
          url: ''
      };
      // synth.toDestination();
      this.startRecording = this.startRecording.bind(this);
      this.stopRecording = this.stopRecording.bind(this);
      this.updateSampleName = this.updateSampleName.bind(this);
      this.handleSave = this.handleSave.bind(this);
      this.handleSubstring = this.handleSubstring.bind(this);
      this.loadSample = this.loadSample.bind(this);
      this.b64toBlob = this.b64toBlob.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }

  startRecording() {
    // TEST
    // this.state.synth.triggerAttackRelease("C3", 0.5);
    // this.state.synth.triggerAttackRelease("C4", 0.5, "+1");
    // this.state.synth.triggerAttackRelease("C5", 0.5, "+2");
    // DELETE ABOVE

    this.props.connectFX(this.props.recorder);
    this.props.recorder.start();
    this.setState({
      recording: true
    });
  }

  handleSubstring(base64String, clipUrl) {
    this.setState({
        file: base64String,
        recording: false,
        url: clipUrl
      })
  }

   stopRecording() {
    let clip, clipUrl, base64String;
    setTimeout(async () => {
      clip = await this.props.recorder.stop();
      clipUrl = URL.createObjectURL(clip)
      var reader = new FileReader();
      reader.readAsDataURL(clip);
      reader.onloadend = () => {
        base64String = reader.result;   
        this.handleSubstring(base64String, clipUrl)
      }
    }, 500);
    // this.props.disconnectFX(this.props.recorder)
  }

  updateSampleName(e) {
    this.setState({
        sampleName: e.currentTarget.value
    })
  }

  handleSave() {
    let sampleData = {
        name: this.state.sampleName,
        user: this.props.currentUserId,
        file: this.state.file
    }
    this.props.saveSample(sampleData)
  }

  handleUpdate() {
    // debugger
    // this.props.updateSample(this.props.currentSample._id)
    let updatedSample = {
      name: this.state.sampleName,
      user: this.props.currentUserId,
      file: this.props.currentSample.file,
      _id: this.props.currentSample._id
    }
    // debugger
    this.props.updateSample(updatedSample)
    // debugger
  }

  handleDelete() {
    this.props.deleteSample(this.props.currentSample._id)
  }

  componentDidUpdate(prevProps){
    if (this.props.currentSample !== prevProps.currentSample) {
      this.loadSample();
      this.setState({
        updating: true
      })
    }
  }

  // stella gives TOTAL credit to stackoverflow - for this helper
  // converting b64 to a blob - I do not know anything about byteCharacters
  // stella apologizes for not knowing how to write this right now
  // stella will quit typing in illeism
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  b64toBlob (b64Data, contentType='audio/webm;codecs=opus', sliceSize=512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  loadSample() {
    let b64str = this.props.currentSample.file.split(',')[1];
    // let url = b64str.split(',')[1]
    // let contentType = 'audio/webm'
    // const blob = new Blob(b64str, {type: 'audio/webm;codecs=opus'});
    let blob = this.b64toBlob(b64str)
    const url = URL.createObjectURL(blob);
    this.setState({
      url,
      name: this.props.currentSample.name,
    });
  }
    
  render() {
    let recordingButton;
    this.state.recording ?
      (
        recordingButton = <button
                            className="record-btn"
                            onClick={this.stopRecording}
                          >
                            <img src={stop} alt='stop-rec' className="rec-img" />
                          </button>
      ) : (
        recordingButton = <button
                            className="record-btn"
                            onClick={this.startRecording}
                          >
                            <img src={start} alt='start-rec' className="rec-img" />
                          </button>
      )

    let saveSample;
    this.state.file ?
    (
      saveSample = 
      <>
          <input
              type="text"
              value={this.state.sampleName}
              onChange={this.updateSampleName}
              placeholder="sample name"
          />
          <button onClick={this.handleSave}>Save</button>
      </>
    ) : (
      saveSample = null
    )

    let download;
    this.state.url ?
    (
      download = 
      <>
        <audio src={this.state.url} controls></audio>
        {/* <Link to={'/'+this.state.url} download target="_self">Download {this.state.name}</Link> */}
        <a href={this.state.url} download>Download {this.state.name}</a>
      </>
    ) : (
      download = null
    )

    let edit;
    this.state.updating ?
    (
      edit = 
      <>
        <input
          type="text"
          value={this.state.sampleName}
          onChange={this.updateSampleName}
          placeholder="sample name"
        />
        <div className="edit-btns">
        <button onClick={this.handleUpdate}>Update</button>
        <button onClick={this.handleDelete}>Delete</button>
        </div>
      </>
    ) : (
      edit = null
    )

    return (
      <div className="sample">
        {recordingButton}
        {download}
        {saveSample}
        {edit}
      </div>
    )
  }
}

export default Sample;