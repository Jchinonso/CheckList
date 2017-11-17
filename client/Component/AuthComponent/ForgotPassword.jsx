import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { forgotPassword } from '../../actions/authActions';

/**
 * @class SignIn
 * @extends React.Component
 */
export class ForgetPassword extends React.Component {
  /**
   * @constructor
   * @extends React.Component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    event.preventDefault();
    this.setState({
      email: event.target.value
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
    const { email } = this.state;
    if (email.trim().length !== 0) {
      this.props.forgotPassword(email);
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
            <a href="#?" className="brand-logo center">Work List</a>
          </div>
        </nav>
        <div className="card auth auth-container-board">
          <div className="col s12 m12 l6">
            <div className="card-panel">
              <h4 className="header-home center" style={{ paddingBottom: '20px' }}>Forgot Password</h4>
              <div className="row">
                <form className="col s12 m12 l12 auth-form center" onSubmit={this.handleOnSubmit}>
                  <div className="row">
                    <div className="input-field col s12" style={{ margin: 0 }}>
                      <i className="material-icons prefix">email</i>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        onChange={this.handleInputChange}
                        className="validate"
                        required="true"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="row">
                      <div className="input-field col s8" style={{ paddingLeft: '60px', margin: '0 auto', width: 'auto' }}>
                        <button
                          id="forgot-btn"
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

ForgetPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};

export default connect(null, ({ forgotPassword }))(ForgetPassword);
