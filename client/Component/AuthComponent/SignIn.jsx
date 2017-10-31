import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Link, browserHistory } from 'react-router';
import GoogleLogin from 'react-google-login';


const SignIn = ({
  responseGoogle,
  handleOnSubmit,
  handleInputChange,
  showSignup,
  email,
  password,
}) =>
  (
    <div className="card auth">
      <div className="col s12 m12 l6">
        <div className="card-panel">
          <h4 className="header2 center" style={{ fontFamily: 'Bree Serif' }}>Sign In</h4>
          <div className="row">
            <div className="col s12 m12 l12 center">
              <div className="container" id="google-button">
                <GoogleLogin
                  clientId={'682330105302-4frgtepd1nj81n3gd82e97usq6ul0ier.apps.googleusercontent.com'}
                  onSuccess={responseGoogle}
                  id="google-login"
                  onFailure={responseGoogle}
                  style={{ width: '100%', }}
                  className="btn red waves-effect waves-light left"
                >
                  <i className="fa fa-google-plus-official fa-4x" aria-hidden="true" />
                  <span> Login with Google</span>
                </GoogleLogin>
              </div>
              <div className="col s12 m12 l12 center" style={{ paddingTop: '10px' }}> Or </div>
            </div>
          </div>
          <div className="row " style={{ paddingTop: '10px' }}>
            <form className="col s12" onSubmit={handleOnSubmit}>
              <div className="row">
                <div className="input-field col s12" style={{ margin: 0 }}>
                  <i className="material-icons prefix">email</i>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    className="validate"
                    value={password}
                    required="true"
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="row">
                  <div className="input-field col s8" style={{ paddingLeft: '60px', margin: '0 auto', width: 'auto' }}>
                    <button
                      className="btn indigo waves-effect waves-light left"
                      type="submit"
                      name="action"
                    >
                      <i className="material-icons right">send</i>
                      Submit
                    </button>
                  </div>
                  <div className="col s4" style={{ marginLeft: '8%', width: 'auto', marginTop: '8px' }}> <Link to="/forgot-password">Forgot Password</Link></div>
                </div>
              </div>
              <div className="center">Don&apos;t have a PostIt account? <a href="#?" onClick={showSignup}>Sign Up</a></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

SignIn.propTypes = {
  responseGoogle: PropTypes.func.isRequired,
  showSignup: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default SignIn;
