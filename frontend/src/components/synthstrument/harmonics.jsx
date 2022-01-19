import React from "react";
import * as Tone from 'tone';

class Harmonics extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="harmonics">
                <input type="checkbox" className="switch off" />
            </div>
        )
    }
}

export default Harmonics;