import React from 'react';
import PropTypes from 'prop-types';

const CreateGroupModal = ({
  handleOnChange, handleOnClick, text
}) =>
  (
    <div
      id="modal1"
      className="modal modal-fixed-footer"
      style={{
        zIndex: 1051, opacity: 1, transform: 'scaleX(1)', top: '10%'
      }}
    >
      <div className="modal-content">
        <h4>Create a Todo</h4>
        <form>
          <div className="input-field create-group">
            <input
              type="text"
              id="group_name"
              name="text"
              onChange={handleOnChange}
              placeholder="Enter Todo Name"
              className="validate"
              value={text}
            />
          </div>
          <button
            href="#!"
            onClick={handleOnClick}
            className="modal-action waves-effect waves-green btn-flat right"
          >
            Create
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  );


CreateGroupModal.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};


export default CreateGroupModal;
