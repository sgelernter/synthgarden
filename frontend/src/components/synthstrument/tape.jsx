import React from "react";

const Tape = () => (
    <div className="cassette-outer">
        <div className="screws top">
        <div className="screw"></div>
        <div className="screw"></div>
        </div>
        <div className="cassette-label">
        <div className="cassette-inner">
            <div className="spool left">
            <div className="tooth"></div>
            <div className="tooth"></div>
            </div>
            <div className="spool right">
            <div className="tooth"></div>
            <div className="tooth"></div>
            </div>
        </div>
        </div>
        <div className="screws bottom">
        <div className="screw"></div>
        <div className="screw"></div>
        </div>
        <div className="cassette-trapezoid">
        </div>
    </div>
)

export default Tape;