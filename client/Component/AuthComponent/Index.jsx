import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn, signUp, googleSignIn } from '../../actions/authActions';
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
      username: '',
      email: '',
      password: '',
      name: '',
      showSignin: true,
      showSignup: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignInOnSubmit = this.handleSignInOnSubmit.bind(this);
    this.handleSignUpOnSubmit = this.handleSignUpOnSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.handleShowSignin = this.handleShowSignin.bind(this);
    this.handleShowSignup = this.handleShowSignup.bind(this);
    this.handleShowResetPassword = this.handleShowResetPassword.bind(this);
  }
  /**
   * Handle onChange events on form inputs
   * @method handleInputChange
   * @member SignIn
   * @param {object} event
   * @returns {function} a function that handles change event on inputs
   */
  handleInputChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * Handle onSubmit events on form inputs
   * @method handleOnSubmit
   * @member SignUp
   * @param {object} event
   * @returns {function} a function that handles submit event on inputs
   */
  handleSignUpOnSubmit(event) {
    event.preventDefault();
    const {
       email, password, username, name
      } = this.state;
    const userObj = {
      password,
      email,
      username,
      name
    };
    this.props.signUp(userObj);
  }

  /**
   * Handle onSubmit events on form inputs
   * @method handleOnSubmit
   * @member SignUp
   * @param {object} event
   * @returns {function} a function that handles submit event on inputs
   */

  handleSignInOnSubmit(event) {
    event.preventDefault();
    if (this.state.email.length && this.state.password.length) {
      const userObj = {
        password: this.state.password,
        email: this.state.email,
      };
      this.props.signIn(userObj);
    }
  }
  /**
   * @method showLogin
   * @returns {void}
   */
  handleShowSignin() {
    this.setState({
      showSignin: true,
      showSignup: false,
      showResetPassword: false
    });
  }
  /**
   * Handle google response event
   * @method responseGoogle
   * @member Authentication
   * @param {object} response
   * @returns {function} a function that sign's in a user with their google account
   */
  responseGoogle(response) {
    const { email, givenName, familyName } = response.profileObj;
    const userObj = {
      username: givenName,
      email,
      password: familyName,
      phoneNumber: '08139308818',
    };
    this.props.googleSignIn(userObj);
  }
  /**
   * @method showSignup
   * @returns {void}
   */
  handleShowSignup() {
    this.setState({
      showSignin: false,
      showResetPassword: false,
      showSignup: true
    });
  }
  /**
   * @method showResetPassword
   * @returns {void}
   */
  handleShowResetPassword() {
    this.setState({
      showResetPassword: true,
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
            <a href="#?" className="brand-logo center"> CHECKLIST</a>
          </div>
        </nav>
        {
        // eslint-disable-next-line
        this.state.showSignin ?
            (
              <SignIn
                responseGoogle={this.responseGoogle}
                showSignup={this.handleShowSignup}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                password={this.state.password}
                handleOnSubmit={this.handleSignInOnSubmit}
              />
            ) : this.state.showSignup ?
              (
                <SignUp
                  handleOnSubmit={this.handleSignUpOnSubmit}
                  showSignin={this.handleShowSignin}
                  handleInputChange={this.handleInputChange}
                  email={this.state.email}
                  password={this.state.password}
                  username={this.state.username}
                  name={this.state.name}
                />
              ) : null
        }
      </div>
    );
  }
}

Authentication.propTypes = {
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  googleSignIn: PropTypes.func.isRequired
};


export default connect(null, { signUp, signIn, googleSignIn })(Authentication);
