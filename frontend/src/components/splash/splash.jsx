import React from 'react';
// import Navbar from '../navbar/navbar';
import NavbarContainer from '../navbar/navbar_container';
import Synthstrument from '../synthstrument/synthstrument';
import './splash.css'

export default function Splash() {
    return (
        <div className="splash-container">
            <NavbarContainer />
            {/* <Navbar /> */}
            <Synthstrument />
        </div>
    )
}
