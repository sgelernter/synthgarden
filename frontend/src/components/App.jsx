import React from "react";
import Modal from './modal/modal';
import Splash from './splash/splash';
import { Route, Switch } from 'react-router-dom';
import NavbarContainer from './navbar/navbar_container';
import Footer from './footer/footer';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import SynthstrumentContainer from './synthstrument/synthstrument_container';
import SidebarContainer from './sidebar/sidebar_container';
// import { Route } from "react-router-dom";

const App = () => (
  <div>
    <header>
      <NavbarContainer />
    </header>
    {/* <Switch> */}
      {/* <Route path='/' component={SynthstrumentContainer} /> */}
      <Modal />  
      <ProtectedRoute path='/' component={SidebarContainer} />
      <Route path="/" component={Splash} />
    {/* </Switch> */}
    <footer>
      <Footer />
    </footer>
  </div>
);

export default App;




