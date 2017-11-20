import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import GoogleLogin from 'react-google-login';

import
{
  isValidEmail, isValidName, isValidPassword, isValidUsername
} from '../../helper/clientSideValidation';
import { signIn, googleSignIn } from '../../actions/authActions';


export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  /**
   * Handle onChange events on form inputs
   *
   * @method handleInputChange
   *
   * @member SignIn
   *
   * @param {object} event
   *
   * @returns {function} a function that handles change event on inputs
   */
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * Handle onSubmit events on form inputs
   *
   * @method handleOnSubmit
   *
   * @member SignIn
   *
   * @param {object} event
   *
   * @returns {function} a function that handles submit event on inputs
   */

  handleOnSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();
    if (!isValidEmail(email)) {
      toastr.error('Invalid Email');
    } else if (!isValidPassword(password)) {
      toastr.error('Password should contain at least 8' +
        'characters including one number and alphabet');
    } else {
      const userObj = {
        password,
        email
      };
      this.props.signIn(userObj);
    }
  }
  /**
   * Handle google response event
   *
   * @method responseGoogle
   *
   * @member SignIn
   *
   * @param {object} response
   *
   * @returns {function} a function that
   *  sign's in a user with their google account
   */
  responseGoogle(response) {
    const {
      email, givenName, familyName, name, imageUrl
    } = response.profileObj;
    const userObj = {
      username: givenName,
      email,
      password: name,
      name,
      imageUrl,
    };
    this.props.googleSignIn(userObj);
  }
  render() {
    const { email, password } = this.state;
    const { showSignup } = this.props;
    return (
      <div className="card auth">
        <div className="col s12 m12 l6">
          <div className="card-panel">
            <h4
              className="header2 center"
              style={{ fontFamily: 'Bree Serif' }}
            >
            Sign In
            </h4>
            <div className="row">
              <div className="col s12 m12 l12 center">
                <div className="container" id="google-button">
                  <GoogleLogin
                    clientId={'646249820676-l4i5hlkoicoiqdiq3gt9oskortf2b3bk.apps.googleusercontent.com'}
                    onSuccess={this.responseGoogle}
                    id="google-login"
                    onFailure={this.responseGoogle}
                    style={{ width: '100%', }}
                    className="btn red waves-effect waves-light left"
                  >
                    <i
                      className="fa fa-google-plus-official fa-4x"
                      aria-hidden="true"
                    />
                    <span> Login with Google</span>
                  </GoogleLogin>
                </div>
                <div
                  className="col s12 m12 l12 center"
                  style={{ paddingTop: '10px' }}
                >
                 Or
                </div>
              </div>
            </div>
            <div className="row " style={{ paddingTop: '10px' }}>
              <form
                className="col s12"
                id="my-form"
                onSubmit={this.handleOnSubmit}
              >
                <div className="row">
                  <div className="input-field col s12" style={{ margin: 0 }}>
                    <i className="material-icons prefix">email</i>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      onChange={this.handleInputChange}
                      className="validate"
                      value={email}
                      required="true"
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12" style={{ margin: 0 }}>
                    <i className="material-icons prefix">lock_outline</i>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      onChange={this.handleInputChange}
                      className="validate"
                      value={password}
                      required="true"
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <div
                      className="input-field col s8"
                      style={{
                        paddingLeft: '60px', margin: '0 auto', width: 'auto'
                      }}
                    >
                      <button
                        className="btn indigo waves-effect waves-light left"
                        type="submit"
                        name="action"
                        id="btn-click"
                      >
                        <i className="material-icons right">send</i>
                        Submit
                      </button>
                    </div>
                    <div
                      className="col s4"
                      style={{
                        marginLeft: '8%', width: 'auto', marginTop: '8px'
                      }}
                    >
                      <Link
                        href="#?"
                        to="/forgot-password"
                      >
                        Forgot Password
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="center"
                >
                Don&apos;t have a WorkList account?
                  <a
                    href="#?"
                    id="toggle-signup"
                    onClick={showSignup}
                  >
                  Sign Up
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  showSignup: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  googleSignIn: PropTypes.func.isRequired
};

export default connect(null, { signIn, googleSignIn })(SignIn);
