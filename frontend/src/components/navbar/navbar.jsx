/*
♡ NAVBAR - FLIPS ON LOGGED IN STATUS ♡
*/

import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ loggedIn, logout, openModal }) => {
  const display = loggedIn ? (
    <div className="logged-in-nav">
      <Link to="/" className="home-link">SynthGarden</Link>
      <button onClick={() => logout()} className="session-btn">logout</button> 
    </div>
  ) : (
        <>
          <div className="logged-out-nav">
            <Link to="/" className="home-link">SynthGarden</Link>
            <div className="session-buttons">
                <button onClick={() => openModal('login')} className="session-btn">login</button>
                <button onClick={() => openModal('signup')} className="session-btn">signup</button>
            </div>
          </div>
        </>
  );

  return (
      <>
        {display}
      </>
  );
};

export default Navbar;