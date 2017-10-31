import React from 'react';
import PropTypes from 'prop-types';

const CreateGroupModal = ({
  handleOnChange, handleOnClick, name, description
}) =>
    (
      <div id="modal1" className="modal modal-fixed-footer" style={{ zIndex: 1051, opacity: 1, transform: 'scaleX(1)', top: '10%' }}>
        <div className="modal-content">
          <h4>Create a Group</h4>
          <form>
            <div className="input-field create-group">
              <input
                type="text"
                id="group_name"
                name="name"
                onChange={handleOnChange}
                placeholder="Enter Group Name"
                className="validate"
                value={name}
              />
              <input
                type="text"
                id="group_desc"
                name="description"
                onChange={handleOnChange}
                placeholder="Give A Group Description"
                className="validate"
                value={description}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            onClick={handleOnClick}
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >
            Create
            <i className="material-icons right">send</i>
          </a>
        </div>
      </div>
    );


CreateGroupModal.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};


export default CreateGroupModal;
