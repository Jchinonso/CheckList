import React from 'react';
import PropTypes from 'prop-types';

const NavComponent = ({ signOut }) => (
  <div className="navbar-fixed" style={{ padding: 0, margin: 0 }}>
    <nav className="indigo top-nav">
      <div className="header-flex">
        <div className="container">
          <a href="#?" data-activates="nav-mobile" className="button-collapse top-nav full hide-on-large-only">
            <i className="material-icons">menu</i>
          </a>
        </div>
        <a href="#?" className="brand-logo">Work List</a>
        <a
          className="right dropdown-button"
          href="#?"
          data-activates="user_dropdown"
        >
          <i className=" material-icons">account_circle</i>
        </a>
        <ul
          className="dropdown-content"
          id="user_dropdown"
        >
          <li><a className="indigo-text modal-trigger" href="#modal2">Edit Profile</a></li>
          <li>
            <a
              href="#?"
              className="sign-out indigo-text"
              onClick={signOut}
              style={{ paddingRight: 10 }}
            >
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

NavComponent.propTypes = {
  signOut: PropTypes.func
};
NavComponent.defaultProps = {
  signOut: null
};

export default NavComponent;
