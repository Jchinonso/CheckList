import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { browserHistory } from 'react-router';

const SignUp = ({
  handleInputChange,
  handleOnSubmit,
  showSignin,
  email,
  password,
  name,
  username
}) =>
  (
    <div className="card auth">
      <div className="col s12 m12 l6">
        <div className="card-panel">
          <h4 className="header2 center">Sign Up</h4>
          <div className="row">
            <form className="col s12" onSubmit={handleOnSubmit}>
              <div className="row">
                <div className="input-field col s12" style={{ margin: 0 }}>
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="icon_telephone"
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    className="validate"
                    value={name}
                    required="true"
                  />
                  <label htmlFor="icon_telephone">Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12" style={{ margin: 0 }}>
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="name4"
                    onChange={handleInputChange}
                    type="text"
                    name="username"
                    className="validate"
                    value={username}
                    required="true"
                  />
                  <label htmlFor="first_name">username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12" style={{ margin: 0 }}>
                  <i className="material-icons prefix">email</i>
                  <input
                    id="email4"
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
                    id="password5"
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    className="validate"
                    value={password}
                    required="true"
                  />
                  <label htmlFor="password">
                   Password
                  </label>
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
                </div>
              </div>
              <div className="center">Already have an account <a href="#?" onClick={showSignin}>Sign In</a></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

SignUp.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  showSignin: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SignUp;
