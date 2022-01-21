import React from "react";
import Mods from "./mods";
import Harmonics from "./harmonics";
import Delays from "./delays";
// import Sample from './sample';

const FXBank = props => {
        return (
            <div className="fx-bank">
                < Mods connectFX={props.connectFX} disconnectFX={props.disconnectFX} updatePatch={props.updatePatch}
                    chorusNode={props.chorusNode}
                    tremoloNode={props.tremoloNode}/>
                {/* <div> */}
                    < Harmonics connectFX={props.connectFX} disconnectFX={props.disconnectFX} updatePatch={props.updatePatch}
                        distortNode={props.distortNode}
                        crushNode={props.crushNode}/>
                    < Delays connectFX={props.connectFX} disconnectFX={props.disconnectFX} updatePatch={props.updatePatch}
                        feedDelayNode={props.feedDelayNode}
                    pongDelayNode={props.pongDelayNode}/>
                {/* </div> */}
                {/* <Sample
                    currentUserId={props.currentUserId}
                    loadSample={props.loadSample}
                    currentSample={props.currentSample}
                    saveSample={props.saveSample}
                    updateSample={props.updateSample}
                    deleteSample={props.deleteSample}
                    recorder={props.recorder}
                    connectFX={props.connectFX}
                    disconnectFX={props.disconnectFX}
                /> */}
            </div>
        )
}

export default FXBank;