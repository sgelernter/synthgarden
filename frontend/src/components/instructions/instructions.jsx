import React from 'react';
import '../../assets/stylesheets/instructions.scss';

class Instructions extends React.Component {

    render() {
        return (
            <div className="instructions">
                <div onClick={this.props.closeModal} className="close-x">x</div>
                <div>
                    <p>Welcome to</p>
                    <h1>SynthGarden</h1>
                    <p className="intro">
                        Make music with an in-browser synth instrument. Press [POWER] to turn the synth on, then explore 
                        various synth settings and create your own patches. You can even record your own short performance samples and download them for later!
                        <br/>
                    </p>
                    <p className="explanations">
                        <span className="explanations-explanation">
                            The best way to get to know the effects is to try them out, but here's 
                            a brief explanation for some selected effects settings to get you started:
                        </span>
                        <span className="separator"/>
                        <span className="separator"/>
                        <span>Type/Shape:</span> The oscillator is what's generating the starting tone for the instrument. Its type and shape determine what the initial sound wave looks like
                        <span className="separator"/>
                        <span>Attack/Release:</span> How long a note takes to reach its full volume/how long it takes to return to silence
                        <span className="separator"/> 
                        <span>Sustain:</span> How long a note lasts before repeating when the key is held down
                        <span className="separator"/>
                        <span>LFO:</span> "Low Frequency Oscillator" - Determines the character of the chorusing effect 
                        <span className="separator"/>
                        <span>Freq:</span> "Frequency" - Determines the speed of the tremolo effect 
                        <span className="separator"/>
                        <span>Crush:</span> Determines how harsh the bits are crushed - lower settings = lower bitrate = a more distorted sound 
                        <span className="separator"/>
                        <span>Amount:</span> Anything with an "amount" slider allows you to blend the raw and effect signals from 0% to 100% processed
                        <span className="separator"/>
                        <span>Feedback:</span> How long the delay will keep repeating
                    </p>
                </div>
            </div>
        )
    }
}

export default Instructions;