import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import
{ isValidEmail, isValidName, isValidPassword, isValidUsername } from '../../helper/clientSideValidation';
import { signUp } from '../../actions/authActions';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
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
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Handle onSubmit events on form inputs
   * @method handleOnSubmit
   *
   * @member SignUp
   *
   * @param {object} event
   *
   * @returns {function} a function that handles submit event on inputs
   */
  handleOnSubmit(event) {
    const { name, email, username, password } = this.state;
    event.preventDefault();
    if (!isValidName(name)) {
      toastr.error('Name should be in letters and should contain at least 5 characters');
    } else if (!isValidEmail(email)) {
      toastr.error('Invalid Email');
    } else if (!isValidUsername(username)) {
      toastr.error('username must contain an alphabet and must not begin with a number');
    } else if (!isValidPassword) {
      toastr.error('Password should contain at least 8 characters including one number and alphabet');
    } else {
      const userObj = {
        password,
        email,
        username,
        name
      };
      this.props.signUp(userObj);
    }
  }
  render() {
    const { email, password, name, username } = this.state;
    const { showSignin } = this.props;
    return (
      <div className="card auth">
        <div className="col s12 m12 l6">
          <div className="card-panel">
            <h4 className="header2 center">Sign Up</h4>
            <div className="row">
              <form className="col s12" onSubmit={this.handleOnSubmit}>
                <div className="row">
                  <div className="input-field col s12" style={{ margin: 0 }}>
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      id="icon_telephone"
                      type="text"
                      name="name"
                      onChange={this.handleInputChange}
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
                      onChange={this.handleInputChange}
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
                      id="password5"
                      type="password"
                      name="password"
                      onChange={this.handleInputChange}
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
    )
  }
}

SignUp.propTypes = {
  showSignin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
};

export default connect(null, { signUp })(SignUp);
