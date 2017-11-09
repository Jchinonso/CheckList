import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chips from 'react-chips';
import { addCollaboratorTodo } from '../../../../actions/collaboratorsAction';

/**
 * @class AddCollaboratorModal
 * @extends React.Component
 */
class AddCollaboratorModal extends React.Component {
  /**
   * @constructor
   * @extends React.Component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      members: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  /**
   * @description Handle onChange events on form inputs
   *
   * @method handleOnChange
   *
   * @member SignUp
   *
   * @param {object} chips
   *
   * @returns {function} a function that handles change event on react-chips
   */
  handleOnChange(chips) {
    this.setState({
      members: chips
    });
  }
  /**
   * Handle onSubmit events on form inputs
   *
   * @method handleOnClick
   *
   * @member AddCollaboratorsModal
   *
   * @param {object} event
   *
   * @returns {function} a function that handles onClick event on a form
   */
  handleOnClick(event) {
    event.preventDefault();
    if (this.state.members.length > 0) {
      this.props.addCollaboratorTodo(this.props.activeTodo, this.state.members);
      this.setState({ members: [] });
    }
  }
  /**
   * render component
   *
   * @method render
   *
   * @member AddCollaboratorsModal
   *
   * @returns {object} component
   */
  render() {
    const { allUsers } = this.props;
    const { collaborators } = this.props;
    let allUsernames;
    if (collaborators) {
      allUsernames = allUsers.filter(user => !collaborators
        .find(existing => existing.username === user.username))
        .map(user => user.username);
    }
    return (
      <div id="add-user" className="modal modal-fixed-footer" style={{ zIndex: 1051, opacity: 1, transform: 'scaleX(1)', top: '10%' }}>
        <div className="modal-content">
          <h4>Add Members</h4>
          <form>
            <div className="create-group">
              <div>
                <Chips
                  value={this.state.members}
                  onChange={this.handleOnChange}
                  suggestions={allUsernames}
                  placeholder="Enter Username"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            onClick={this.handleOnClick}
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >
            Add
          </a>
        </div>
      </div>
    );
  }
}
AddCollaboratorModal.defaultProps = {
  activeTodo: '',
  collaborators: []
};
AddCollaboratorModal.propTypes = {
  activeTodo: PropTypes.string,
  addCollaboratorTodo: PropTypes.func.isRequired,
  allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  collaborators: PropTypes.arrayOf(PropTypes.object)
};


function mapStateToProps(state) {
  return {
    activeTodo: state.activeTodoReducer,
    allUsers: state.userReducer.users,
    collaborators: state.collaboratorReducer.collaborators
  };
}


export default connect(mapStateToProps,
  { addCollaboratorTodo })(AddCollaboratorModal);
