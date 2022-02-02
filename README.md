## Overview
Make music with an in-browser synth instrument! Explore various synth settings and create your own patches. You can even record your own short performance samples and download them for later! The live site is available <a href="https://synthgarden.herokuapp.com" target="_blank">here</a>!


## Technologies
Backend:
- MongoDB
- ExpressJS

Frontend:
- React / Redux
- NodeJS
- ToneJS
- MediaRecorder API

## Functionalities
- In-browser synth instrument
// code here

- Patches
// code here

- Samples Recordings, and Download
`A recorder is monkey-patched to change the audio mimeType to mp3 using the MediaRecorder API, and an mpegEncoder.`
```js
class PatchedRecorder extends Tone.Recorder {
    constructor(props) {
        super(props);
        const defaultRecorder = this._recorder;
        AudioRecorder.encoder = mpegEncoder;
        AudioRecorder.prototype.mimeType = 'audio/mpeg';
        const newRecorder = new AudioRecorder();
        newRecorder.stream = defaultRecorder.stream;
        this._recorder = newRecorder;
    }
}
```
`The recorder node is hooked into the main Synth instrument component via a bespoke connect function.`
```js
this.props.connectFX(this.props.recorder);
```
`Samples are recorded as blobs, and converted into Base64 strings before sending them to the backend for storage. This method allowed us to circumvent AWS or other external cloud technologies.`
```js
stopRecording() {
    let clip, clipUrl, base64String;
    setTimeout(async () => {
        clip = await this.props.recorder.stop(); // blob returned
        clipUrl = URL.createObjectURL(clip)
        var reader = new FileReader();
        reader.readAsDataURL(clip);
        reader.onloadend = () => {
        base64String = reader.result;   
        this.handleSubstring(base64String, clipUrl, clip)
        }
    }, 500);
}
```
`Storage limit was manually increased to allow users to save longer samples, while considering the hosting platform's, Heroku, limit.`
```js
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb'}));
app.use(bodyParser.json({ limit: '10mb'}));
```
`When a sample recording is retrieved from the backend, the Base64 string is converted into a blob with a function b64toBlob which takes in the b64str that was saved in our backend. This blob is then fed into an audio element, users can listen, update, or delete their recordings.`
```js
loadSample() {
    let b64str = this.props.currentSample.file.split(',')[1];
    let blob = this.b64toBlob(b64str)
    const url = URL.createObjectURL(blob);
    this.setState({
      url,
      sampleName: this.props.currentSample.name,
    });
    this.audio = new Audio(url);
  }
```