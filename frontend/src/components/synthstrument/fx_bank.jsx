import React from "react";
import * as Tone from 'tone';
import Mods from "./mods";
import Harmonics from "./harmonics";
import Delays from "./delays";

class FXBank extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="fx-bank">
                < Mods />
                < Harmonics />
                < Delays />
            </div>
        )
    }
}

export default FXBank;