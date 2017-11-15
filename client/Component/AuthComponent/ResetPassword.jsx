import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { resetPassword } from '../../actions/authActions';

/**
 * @class SignIn
 * @extends React.Component
 */
class ResetPassword extends React.Component {
  /**
   * @constructor
   * @extends React.Component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      retypePassword: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  /**
   * Handle onChange events on form inputs
   * @method handleInputChange
   * @member SignIn
   * @param {object} event
   * @returns {function} a function that handles change event on inputs
   */
  handleInputChange(event) {
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

  handleOnSubmit(event) {
    event.preventDefault();
    const { newPassword, retypePassword } = this.state;
    if (newPassword.trim().length !== 0 && retypePassword.trim().length !== 0) {
      const token = this.props.location.query.secret;
      this.props.resetPassword({ newPassword, retypePassword, token });
    }
  }

  /**
   * render component
   * @method render
   * @member SignIn
   * @returns {object} component
   */
  render() {
    return (
      <div>
        <nav className="indigo">
          <div className="nav-wrapper" >
            <a href="#?" className="brand-logo center"> Work List </a>
          </div>
        </nav>
        <div className="card auth">
          <div className="col s12 m12 l6">
            <div className="card-panel">
              <h4 className="header2 center" style={{ paddingBottom: '20px' }}>Reset Password</h4>
              <div className="row">
                <form className="col s12 m12 l12 center" onSubmit={this.handleOnSubmit}>
                  <div className="row">
                    <div className="input-field col s12" style={{ margin: 0 }}>
                      <i className="material-icons prefix">lock_outline</i>
                      <input
                        id="password5"
                        type="password"
                        name="newPassword"
                        onChange={this.handleInputChange}
                        className="validate"
                        required="true"
                      />
                      <label htmlFor="password">New Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12" style={{ margin: 0 }}>
                      <i className="material-icons prefix">lock_outline</i>
                      <input
                        id="password5"
                        type="password"
                        name="retypePassword"
                        onChange={this.handleInputChange}
                        className="validate"
                        required="true"
                      />
                      <label htmlFor="password">Retype-Password</label>
                    </div>
                  </div>
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
                  <div className="center">Don&apos;t have a WorkList account? <Link to="/">Sign In</Link></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, ({ resetPassword }))(ResetPassword);
