import React from "react";
import * as Tone from 'tone';

class Oscillator1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            oscillator: this.props.oscillator,
            oscType: '',
            waveType: 'pwm'
        }
        this.updateSettings = this.updateSettings.bind(this);
    }

    updateSettings(e){
        e.preventDefault();
        if (e.currentTarget.name === 'oscType') {
            const pwmOption = document.getElementById('pwm-option1');
            if (e.target.value !== '') {
                pwmOption.setAttribute('disabled', true);
                document.getElementById('sine-option1').selected = true;
                if (this.state.waveType === 'pwm') this.state.waveType = 'sine';
            } else {
                pwmOption.removeAttribute('disabled');
            } 
                
            this.state.oscType = e.target.value;
        } else {
            this.state.waveType = e.target.value;
        }
        this.state.oscillator.type = this.state.oscType + this.state.waveType;
        console.log(this.state.oscillator.type);
    }

    render(){
        return (
            <div className="oscillator">
                <label>Oscillator type
                    <select name="oscType" onChange={this.updateSettings}>
                        <option value="">Omni</option>
                        <option value="fm">FM</option>
                        <option value="am">AM</option>
                        <option value="fat">Fat</option>
                    </select>
                </label>
                <label>Oscillator shape
                    <select name="shapeType" onChange={this.updateSettings} defaultValue="pwm">
                        <option value="sine" id="sine-option1">Sine</option>
                        <option value="square">Square</option>
                        <option value="triangle">Triangle</option>
                        <option value="sawtooth">Sawtooth</option>
                        <option value="pwm" id="pwm-option1">PWM</option>
                    </select>
                </label>
            </div>
        )
    }
}

export default Oscillator1;