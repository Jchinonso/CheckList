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
        <a href="#?" className="brand-logo">Post It</a>
        <a
          href="#?"
          className="sign-out"
          onClick={signOut}
          style={{ paddingRight: 10 }}
        >
          <i className="fa fa-sign-out fa-2x right" />
        </a>
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
