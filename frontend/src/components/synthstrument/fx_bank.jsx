import React from "react";
import Mods from "./mods";
import Harmonics from "./harmonics";
import Delays from "./delays";

const FXBank = props => {
        return (
            <div className="fx-bank">
                < Mods connectFX={props.connectFX} disconnectFX={props.disconnectFX} updatePatch={props.updatePatch}
                    chorusNode={props.chorusNode}
                    tremoloNode={props.tremoloNode}/>
                < Harmonics connectFX={props.connectFX} disconnectFX={props.disconnectFX} updatePatch={props.updatePatch}
                    distortNode={props.distortNode}
                    crushNode={props.crushNode}/>
                < Delays connectFX={props.connectFX} disconnectFX={props.disconnectFX} updatePatch={props.updatePatch}
                    feedDelayNode={props.feedDelayNode}
                pongDelayNode={props.pongDelayNode}/>
            </div>
        )
}

export default FXBank;