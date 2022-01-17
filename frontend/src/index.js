import './App.css';
import React from 'react'
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  store = configureStore();
  // if (window.currentUser) {
  //   const preloadedState = {
  //     entities: {
  //       users: { [window.currentUser.id]: window.currentUser }
  //     },
  //     session: { id: window.currentUser.id }
  //   };
  //   store = configureStore(preloadedState);
  //   delete window.currentUser;
  // } else {
  //   store = configureStore();
  // }
  
  // TESTING START - REMOVE LATER
  // window.store = store;
  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // window.signup = signup;
  // window.login = login;
  // window.logout = logout;
  // TESTING END

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);

});