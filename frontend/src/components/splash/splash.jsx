import React from 'react';
import Navbar from '../navbar/navbar';
import Synthstrument from '../synthstrument/synthstrument';
import './splash.css'

export default function Splash() {
    return (
        <div className="splash-container">
            <Navbar />
            <Synthstrument />
        </div>
    )
}
