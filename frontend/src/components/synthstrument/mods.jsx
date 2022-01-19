import React from "react";
import * as Tone from 'tone';

class Mods extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mods">
                <input type="checkbox" className="switch off" />

            </div>
        )
    }
}

export default Mods;