import React from "react";
import Modal from './modal/modal';
import Splash from './splash/splash';
import { Route } from 'react-router-dom';
import NavbarContainer from './navbar/navbar_container';
import Footer from './footer/footer';
import { ProtectedRoute } from '../util/route_utils';
import SidebarContainer from './sidebar/sidebar_container';

const App = () => (
  <div>
    <header>
      <NavbarContainer />
    </header>
      <Modal />  
      <ProtectedRoute path='/' component={SidebarContainer} />
      <Route path="/" component={Splash} />
    <footer>
      <Footer />
    </footer>
  </div>
);

export default App;




