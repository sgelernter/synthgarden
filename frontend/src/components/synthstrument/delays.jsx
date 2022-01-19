import React from "react";
import * as Tone from 'tone';

class Delays extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="delays">
                <input type="checkbox" className="switch off" />
            </div>
        )
    }
}

export default Delays;