import React from "react";
// import NavbarContainer from "./navbar/navbar_container";
// import LoginFormContainer from "./session_form/login_form_container";
// import SignupFormContainer from "../components/session_form/signup_form_container";
import Splash from './splash/splash';
// import { Route, Switch } from 'react-router-dom';
import { Route } from "react-router-dom";

const App = () => (
  <div>
      {/* <Route path="/signup" component={SignupFormContainer} />
      <Route path="/login" component={LoginFormContainer} /> */}
      
      {/* <Switch> */}
        <Route exact path="/" component={Splash} />
      {/* </Switch> */}

    
  </div>
);

export default App;