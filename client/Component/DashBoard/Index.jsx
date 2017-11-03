import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import NavComponent from './NavComponent/Index.jsx';
import SideBarComponent from './SideBarComponent/Index.jsx';
import MainComponent from './MainComponent/Index.jsx';
// import MessageArea from './MessageArea/Index.jsx';
import CreateTodoModal from './SideBarComponent/CreateTodoModal.jsx';
// import { getAllGroupMessages } from '../../actions/messageActions';
import { selectTodo, createTodo } from '../../actions/todosActions';
// import { fetchGroupMembers } from '../../actions/memberActions';
import { signOut } from '../../actions/authActions';


/**
 * @class AddGroupUserModal
 * @extends React.Component
 */
class Dashboard extends React.Component {
  /**
 * @constructor
 * @extends React.Component
 * @param {object} props
 */
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleChangeGroup = this.handleChangeGroup.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    $(document).ready(() => {
      $('.modal').modal();
      $('.tooltipped').tooltip({ delay: 50 });
      $('.button-collapse').sideNav({
        menuWidth: 250
      });
    });
  }
  /**
   * Handle onChange events on form inputs
   * @method handleInputChange
   * @member SignUp
   * @param {object} event
   * @returns {function} a function that handles change event on inputs
   */
  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * Handle onClick events on form inputs
   * @method handleOnClick
   * @member CreateGroupModal
   * @param {object} event
   * @returns {function} a function that handles onClick event on inputs
   */
  handleOnClick(event) {
    event.preventDefault();
    const { text } = this.state;
    if (text !== undefined) {
      const newText = text.trim();
      if (newText.length === 0) {
        return toastr.error('Group Credentials must be supplied');
      }
      this.props.createTodo(newText)
        .then(() => {
          this.setState({ text: '' }, () => {
          });
        });
    }
  }
  /*
  * Handle Change Group
  * @method handleChangeGroup
  * @member MainComponent
  * @param {object} groupId
  * @returns {function} a function that changes group and dispatches some actions
  */
  handleChangeGroup(groupId) {
    this.props.selectTodo((groupId));
    // this.props.getAllGroupMessages(groupId);
    // this.props.fetchGroupMembers(groupId);
  }

  /**
   * Handle signout event
   * @method handleOnChange
   * @member Dashboard
   * @param {object} event
   * @returns {function} a function that dispatch signOut action
   */
  handleSignOut(event) {
    this.props.signOut();
  }

  /**
   * render component
   * @method render
   * @member Dashbaord
   * @returns {object} component
   */
  render() {
    const { name, description } = this.state;
    return (
      <div>
        <header>
          <NavComponent signOut={this.handleSignOut} />
          <SideBarComponent handleChangeGroup={this.handleChangeGroup} />
        </header>
        <CreateTodoModal handleOnChange={this.handleOnChange} handleOnClick={this.handleOnClick} text={this.state.text} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  signOut: PropTypes.func.isRequired,
  selectTodo: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired
};

export default connect(
  null,
  { signOut, selectTodo, createTodo }
)(Dashboard);
