import React from 'react';
// import Navbar from '../navbar/navbar';
import NavbarContainer from '../navbar/navbar_container';
import Record from '../controls/record';
// import { AuthRoute } from '../../util/route_utils';
// import Synthstrument from '../synthstrument/synthstrument';
import SynthstrumentContainer from '../synthstrument/synthstrument_container';
import '../../assets/stylesheets/splash.scss';

export default function Splash() {
    return (
        <div className="splash-container">
            <NavbarContainer />
            {/* <Navbar /> */}

            <Synthstrument />
            <Record />
            {/* <AuthRoute path="/" component={Record} /> */}
            <SynthstrumentContainer />
        </div>
    )
}
