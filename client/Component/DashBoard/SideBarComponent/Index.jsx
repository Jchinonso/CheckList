import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import TodoListItem from './TodoListItem.jsx';
import { fetchTodos, selectTodo } from '../../../actions/todosActions';
import { fetchTasks } from '../../../actions/tasksActions';
import { fetchCollaborators, fetchUsers } from '../../../actions/collaboratorsAction';

/**
 * @constructor
 * @extends React.Component
 * @param {object} props
 */
class SideBarComponent extends React.Component {
  componentDidMount() {
    this.props.fetchTodos()
      .then(() => {
        if (this.props.todos.length > 0) {
          this.props.selectTodo(this.props.todos[0]._id);
          this.props.fetchTasks(this.props.todos[0]._id);
          this.props.fetchCollaborators(this.props.todos[0]._id)
          this.props.fetchUsers();
        }
      });
  }
  /**
 * render component
 *
 * @method render
 *
 * @member SideBarComponent
 *
 * @returns {object} component
 */
  render() {
    return (
      <ul id="nav-mobile"className="side-nav fixed">
        <li className="center no-padding">
          <div className="top-nav darken-2 indigo" style={{ height: 180 }}>
            <div className="row">
              <div className="col s12 m12" style={{ paddingTop: 10 }}>
                <img
                  src={this.props.imageUrl}
                  alt="profile-pics"
                  className="circle responsive-img valign profile-image"
                  style={{width: 130, height: 120}}
                />
              </div>
              <div className="col s12 m12" style={{ marginTop: '-35px' }}>
                <p style={{ color: 'white' }}>
                  {this.props.username}
                </p>
              </div>
            </div>
          </div>
        </li>
        <li id="dashboard">
          <span>Todos</span>
          <a
            className="secondary-content  tooltipped modal-trigger"
            href="#modal1"
            data-position="right"
            data-delay="50"
            data-tooltip="Create New Todo"
          >
            <span className="caption"> + </span>
          </a>
        </li>
        <TodoListItem handleChangeTodo={this.props.handleChangeTodo} todos={this.props.todos} activeTodo={this.props.activeTodo} />
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.authReducer.user.username,
    imageUrl: state.authReducer.user.imageUrl,
    todos: state.todosReducer.todos,
    activeTodo: state.activeTodoReducer
  };
}


SideBarComponent.defaultProps = {
  activeTodo: ''
};

SideBarComponent.propTypes = {
  activeTodo: Proptypes.string,
  selectTodo: Proptypes.func.isRequired,
  handleChangeTodo: Proptypes.func.isRequired,
  todos: Proptypes.arrayOf(Proptypes.object).isRequired,
  username: Proptypes.string.isRequired,
  fetchTodos: Proptypes.func.isRequired,
  fetchTasks: Proptypes.func.isRequired,
  fetchUsers: Proptypes.func.isRequired,
  fetchCollaborators: Proptypes.func.isRequired
};


export default connect(
  mapStateToProps,
  { fetchTodos, selectTodo, fetchCollaborators, fetchUsers, fetchTasks }
)(SideBarComponent);
