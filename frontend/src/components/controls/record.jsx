import React from 'react';
import * as Tone from 'tone';

class Record extends React.Component {
  constructor(props) {
    super(props)
    const synth = new Tone.Synth();
    const actx = Tone.context;
    console.log(actx);
    
    synth.toMaster();

    const notes = 'CDEFGAB'.split('').map(n => `${n}4`);
    let note = 0;
    Tone.Transport.scheduleRepeat(time => {
      synth.triggerAttack(notes[note % notes.length]);
      note ++;
    }, '4n');
    Tone.Transport.start();
  }

  render() {
    return (
      <>
        <audio controls></audio>

        {/* start recording
            stop recording
            DELETE?

            download
            play
            pause
            stop */}
      </>
    )
  }
}

export default Record;