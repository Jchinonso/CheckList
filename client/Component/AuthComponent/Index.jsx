import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

/**
 * @class Authentication
 * @extends React.Component
 */
class Authentication extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      showSignin: true,
      showSignup: false,
    };
    this.handleShowSignin = this.handleShowSignin.bind(this);
    this.handleShowSignup = this.handleShowSignup.bind(this);
  }

  /**
   * @method showLogin
   * @returns {void}
   */
  handleShowSignin() {
    this.setState({
      showSignin: true,
      showSignup: false,
    });
  }
  /**
   * @method showSignup
   * @returns {void}
   */
  handleShowSignup() {
    this.setState({
      showSignin: false,
      showSignup: true
    });
  }
  /**
   * @method render
   * @returns {object} authentication component
   */
  render() {
    return (
      <div>
        <nav className="indigo">
          <div className="nav-wrapper" >
            <a href="#?" className="brand-logo center"> WORKLIST </a>
          </div>
        </nav>
        {
        // eslint-disable-next-line
        this.state.showSignin ?
            (
              <SignIn
                showSignup={this.handleShowSignup}
              />
            ) : this.state.showSignup ?
              (
                <SignUp
                  showSignin={this.handleShowSignin}
                />
              ) : null
        }
      </div>
    );
  }
}

export default Authentication;
