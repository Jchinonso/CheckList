import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';

import { updateUser } from '../../../actions/authActions';
import EditProfilePics from './EditProfilePics.jsx';
import EditUserInfo from './EditUserInfo.jsx';
import { isValidEmail, isValidPassword, isValidName }
  from '../../../helper/clientSideValidation';

/**
 * @class EditProfileComponent
 * @extends {Component}
 */
class EditProfileComponent extends Component {
  constructor(props) {
    super(props);
    const { email, username, name } = this.props.user;
    this.state = {
      disabled: true,
      username,
      email,
      name,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.toggleDisabled = this.toggleDisabled.bind(this);
  }

  /**
   *
   * @method  toggleDisabled
   *
   * @memberof EditProfileComponent
   *
   * @param {Object} event
   *
   * @returns {void}
   */
  toggleDisabled(event) {
    this.setState({
      disabled: false
    });
  }

  /**
   *
   * @method handleOnClick
   *
   * @returns {void}
   *
   * @memberof EditProfileComponent
   *
   * @param {any} event
   * @param {Function} callback
   */
  handleOnClick(event) {
    const { name, email } = this.state;
    if (!isValidEmail(email)) {
      toastr.error('Email is Invalid');
    } else if (!isValidName(name)) {
      toastr
        .error('Name should be in letters and must be 5' +
        'to 30 characters and must contain first name and last name');
    } else {
      const userObject = {
        name,
        email
      };
      this.props.updateUser(userObject).then(() => {
        this.setState({
          disabled: true
        });
      });
    }
  }

  /**
   *
   * @method handleInputChange
   *
   * @memberof EditProfileComponent
   *
   * @param {any} event
   *
   * @returns {void}
   */
  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   *
   * @method render
   *
   * @memberof EditProfileComponent
   *
   * @returns {object} a Create Task Component
  */

  render() {
    return (
      <div>
        <div id="modal2" className="modal">
          <div className="modal-content">
            <div className="row">
              <h4 className="center">Update Profile</h4>
              <EditProfilePics />
              <EditUserInfo
                handleOnClick={this.handleOnClick}
                toggleDisabled={this.toggleDisabled}
                disabled={this.state.disabled}
                handleOnChange={this.handleOnChange}
                user={this.state}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authReducer.user
  };
}

EditProfileComponent.propTypes = {
  user: PropTypes.shape.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { updateUser })(EditProfileComponent);
