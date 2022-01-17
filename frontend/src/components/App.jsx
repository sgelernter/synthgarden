import React from "react";
// import NavbarContainer from "./navbar/navbar_container";
import Modal from './modal/modal';
import Splash from './splash/splash';
// import { Route, Switch } from 'react-router-dom';
// import { Route } from "react-router-dom";

const App = () => (
  <div>
    <Modal />  
    {/* <Route exact path="/" component={Splash} /> */}
    <Splash />
  </div>
);

export default App;