import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Recipe_app.svg';
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoMdLogIn } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Navbar = ({ currentUser, logOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleMenuClose = () => setMenuOpen(false);

  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleMenuClose}>
          <img 
            className='navbar-logo-img'
            src={logo} alt="Recipe App" />
          <span className="navbar-logo-text">Recipe App</span>
        </Link>
        <button className="navbar-hamburger" onClick={handleMenuToggle} aria-label="Menu">
          <GiHamburgerMenu size={28} />
        </button>
        <ul className={`nav-menu${menuOpen ? ' nav-menu-open' : ''}`}>
          <li className="nav-item">
            <Link to="/home" className="nav-links" onClick={handleMenuClose}>
              <IoHomeOutline className='mr-2 mt-0.5' /> Home
            </Link>
          </li>
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-links" onClick={handleMenuClose}>
                  <CgProfile className='mr-2 mt-0.5' /> Profile
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-links" onClick={() => { logOut(); handleMenuClose(); }}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={handleMenuClose}>
                  <IoMdLogIn className='mr-2 mt-0.5' />Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links-primary" onClick={handleMenuClose}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
