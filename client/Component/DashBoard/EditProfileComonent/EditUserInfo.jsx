import React from 'react';
import PropTypes from 'prop-types';

const EditUserInfo = ({
  handleOnClick,
  toggleDisabled,
  disabled,
  handleOnChange,
  user,
}) => (
  <div className="col s12 m6">
    <form>
      <div
        className="input-field create-group"
      >
        <input
          type="email"
          id="group_name"
          name="email"
          onChange={handleOnChange}
          disabled={disabled}
          value={user.email}
        />
      </div>
      <div className="input-field create-group">
        <input
          type="text"
          id="group_name"
          name="name"
          onChange={handleOnChange}
          disabled={disabled}
          value={user.name}
        />
      </div>
      <div
        className="input-field create-group"
      >
        <input
          type="text"
          id="group_name"
          name="username"
          onChange={handleOnChange}
          value={user.username}
          disabled
        />
      </div>
      <div
        className="input-field create-group row"
      >
        <div className="col s4 m4" >
          <button
            type="button"
            onClick={toggleDisabled}
          >Edit
          </button>
        </div>
        <div className="col s4 m4">
          <button
            type="button"
            onClick={handleOnClick}
          >Save
          </button>
        </div>
      </div>
    </form>
  </div>
);

EditUserInfo.propTypes = {
  toggleDisabled: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired
};

export default EditUserInfo;
