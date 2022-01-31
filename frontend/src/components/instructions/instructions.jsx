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
                    <p>Play with an in-browser synth instrument. Press [POWER], and explore various synth settings, and create your own patches! Record your own samples with various patch settings, and download them for later!</p>
                </div>
            </div>
        )
    }
}

export default Instructions;