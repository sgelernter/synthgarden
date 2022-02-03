<p align="center"><img width="500" alt="logo" src="https://user-images.githubusercontent.com/17345270/152244000-65425c10-d429-4dfb-b67d-200ab6cc27ea.png"></p>
Welcome to SynthGarden! A place where users can make music with an in-browser synth instrument, explore synth settings, and create your own patches! Users can also record short performance samples and download them for later.

### Try it <a href="https://synthgarden.herokuapp.com" target="_blank">here</a>!
<p align="center">
    <img src="https://user-images.githubusercontent.com/17345270/152242659-c8ca5834-867c-42e5-a28c-0ac51736daa4.gif" width="800">
</p>

## Technologies
SynthGarden is a MERN stack web application that utilizes Web Audio API for handling audio operations in an audio setting.

Backend:
- MongoDB
- Express

Frontend:
- React / Redux
- Node.js
- Tone.js
- MediaRecorder API
- Web-Audio-Oscilloscope

## Functionalities
### Backend
The backend employs Mongoose as an Object Data Modeling (ODM) Library for MongoDB's document-based NoSQL database to make storage more flexible. Controllers and routes were created using mongoose to fetch data from the frontend via user interactions.
```js
    router.post('/',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { isValid, errors } = validateSampleInput(req.body);
        if(!isValid) return res.status(400).json(errors);

        const newSample = new Sample({
            user: req.body.user,
            name: req.body.name,
            file: req.body.file
        })

        newSample
            .save()
            .then(sample => res.json(sample))
    }
)

    router.patch('/:id',
        passport.authenticate("jwt", { session: false }),
        (async (req, res) => {
            Sample.findById(req.params.id)
                .then(sample => {
                    sample.name = req.body.name;
                    sample.save().then(() => res.json(sample))
                });
        })
    )
```

### Synth Instrument
The synth instrument is constructed using the `Tone.js` library, a modular music-creation framework wrapped around the `Web Audio API`. The main synth component acts as the "single source of truth" for all of the musical elements of the app, and it's responsible for initializing not just the audio context but also each of the individual audio processing nodes that the user can adjust to customize the instrument's sound. Modern browsers don't allow apps to generate audio without user input (and thank goodness for that!), so we use a simulated power button in the UI to first start up the tone generator ("oscillator") if this is the first time powering the instrument on that session, before then setting up event listeners to allow users to play the instrument with their keyboard:

```js
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
```

Once the instrument is "powered on", we wanted a way to allow users to swap different effects in and out of the signal chain on the fly, in any order they wanted. To accomplish that, we gave the synth component two functions that when passed as a prop to an effects component allow that component to seamlessly insert its effect into or remove itself from the signal flow. The really fun thing about these functions is that they're effect-agnostic, which means this instrument can be expanded in the future to include any number of additional effects without having to add nearly any new logic to the instrument itself: 

```js
    connectFX(effectNode){
        const destination = Tone.getDestination();
        let prevLastNode;
        this.signalChain.length === 0 ? prevLastNode = this.state.eq3 : prevLastNode = this.signalChain.slice(-1)[0];
        
        if (effectNode.name !== 'Recorder') {
            prevLastNode.disconnect(destination);
            prevLastNode.chain(effectNode, destination);
            this.signalChain.push(effectNode);
            this.setState({lastLink: effectNode});
        } else {
            prevLastNode.connect(effectNode);
        }
    }

    disconnectFX(effectNode){
        const destination = Tone.getDestination();
        if (this.signalChain.length === 1) {
            effectNode.disconnect(destination);
            this.signalChain = [];
            this.state.eq3.connect(destination);
            this.setState({lastLink: this.state.eq3});
        } else {
            this.signalChain.forEach (node => node.disconnect());
            const idx = this.signalChain.indexOf(effectNode);
            const newChain = this.signalChain.slice(0, idx).concat(this.signalChain.slice(idx + 1));
            this.state.eq3.chain(...newChain, destination);
            this.signalChain = newChain;
            this.setState({lastLink: newChain.slice(-1)[0]});
        }
    }
```

### Patches
A synth "patch" is essentially a recipe for creating a custom sound, except instead of a teaspoon of salt and two eggs you might be working with 20% distortion, a mid-scooped EQ curve, and a long-tail stereo delay. Because the synth component is responsible for tracking the settings of each effect node in real-time, allowing users to store patches in the backend is as simple as passing the database a `patchData` object that contains the current settings for each effect in the synth, along with the current order of those effects and flags that track whether any given effect is on or off: 
```js
        const modsOn = document.getElementById('mods').className === 'mods on';
        const harmonicsOn = document.getElementById('distortion').className === 'harmonics on';
        const delaysOn = document.getElementById('delay').className === 'delays on';
        const signalChain = this.signalChain.map(node => node.name).join('/');
        let selectedDelay;
        let selectedHarmonics;
        document.getElementById('distortion-controls').className === 'distortion visible' ? selectedHarmonics = 'distortion' : selectedHarmonics = 'bitcrush';
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
            },
            signalChain
        }
```

### Sample Recordings, and Download
A recorder is monkey-patched to modify the audio `mimeType` to mp3 from the webm default using the `MediaRecorder API`, and an `mpegEncoder`. Users can download recordings as mp3s.
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
The recorder node is hooked into the main Synth instrument component via a bespoke `connectFX`.
```js
this.props.connectFX(this.props.recorder);
```
Samples are recorded as `blob`s, and converted into `Base64` strings before sending them to the backend for storage. Through this, we circumvent external cloud technologies, e.g. AWS.
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
            this.handleSubstring(base64String, clipUrl, clip) // save b64str to backend
        }
    }, 500);
}
```
Storage limit is manually increased so users can save longer samples, while considering our hosting platform's, `Heroku`, limit.
```js
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb'}));
app.use(bodyParser.json({ limit: '10mb'}));
```
When a sample recording is retrieved from the backend, the Base64 string is converted into a blob with a function `b64toBlob(b64str)`. This blob is fed into an audio element, so users can listen, update, or delete their recordings.
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

## Future Implementations
- Allow users to layer samples together
- Create 'rooms' to group associated patches and samples
