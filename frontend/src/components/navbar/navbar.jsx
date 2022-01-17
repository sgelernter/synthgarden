/*
♡ NAVBAR - FLIPS ON LOGGED IN STATUS ♡
*/

import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ currentUser, logout }) => {
  const display = currentUser ? (
    <div className="logged-in-nav">
      <Link to="/" className="home-link">SynthGarden</Link>
      <Link to="/logout" className="session-btn">log out</Link>
    </div>
  ) : (
        <>
          <div className="logged-out-nav">
            <Link to="/" className="home-link">SynthGarden</Link>
            <div className="session-buttons">
                <Link to="/login" className="session-btn">log in</Link>
                <Link to="/signup" className="session-btn">sign up</Link>
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