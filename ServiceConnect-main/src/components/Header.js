// Import necessary libraries and components
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFromLocalStorage } from '../pages/localStorageUtil.js'; // Import the utility function to get from local storage

// Header component
const Header = () => {
  const headerStyle = {
    zIndex: 1000, // Higher z-index
  };

  const isAuthenticated = getFromLocalStorage('isAuthenticated');
  const role = getFromLocalStorage('role');

  const logoStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica", "Arial", sans-serif',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: 'white',
    textDecoration: 'none',
  };

  const logoImageStyle = {
    marginRight: '15px', // Adjust the margin as needed
    height: '40px', // Set the height of the logo
  };

  return (
    <header className="header" style={headerStyle}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/home" className="navbar-brand" style={logoStyle}>
          <img src="logo1.jpg" alt="Logo" style={logoImageStyle} /> {/* Add the logo here */}
          Service<span>Connect </span>
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Services" className="nav-link">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ContactUs" className="nav-link">
                <FontAwesomeIcon icon={faEnvelope} /> ContactUs
              </Link>
            </li>
          </ul>

          <form className="form-inline my-2 my-lg-0 mx-auto">
            <div className="input-group">
              <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-outline-success ml-2" type="submit" style={{ marginLeft: '10px' }}>
                  Search
                </button>
              </div>
            </div>
          </form>
          {/* Conditionally render the login link or profile link */}
          <ul className="navbar-nav ml-auto my-lg-0 mx-auto">
            {isAuthenticated ? (
              <>
                {role === 'Admin' && (
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                )}
                {role === 'ServiceProvider' && (
                  <li className="nav-item">
                    <Link to="/appointments" className="nav-link">
                      Appointments
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to="/Profile" className="nav-link">
                    <FontAwesomeIcon icon={faUser} color='green' /> Profile
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  <FontAwesomeIcon icon={faUser} /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;