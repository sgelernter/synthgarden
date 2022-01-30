import AudioRecorder from 'audio-recorder-polyfill';
import mpegEncoder from 'audio-recorder-polyfill/mpeg-encoder';
import * as Tone from 'tone';


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

export default PatchedRecorder;