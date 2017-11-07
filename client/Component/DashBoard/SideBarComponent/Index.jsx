import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem.jsx';
import { fetchTodos, selectTodo } from '../../../actions/todosActions';
// import { getAllGroupMessages } from '../../../actions/messageActions';

/**
 * @constructor
 * @extends React.Component
 * @param {object} props
 */
class SideBarComponent extends React.Component {
  componentDidMount() {
    this.props.fetchTodos();
    // .then(() => {
    //   if (this.props.groups.length > 0) {
    //     this.props.selectGroup(this.props.groups[0].id);
    //     this.props.getAllGroupMessages(this.props.groups[0].id);
    //   }
    // });
  }
  /**
 * render component
 * @method render
 * @member SideBarComponent
 * @returns {object} component
 */
  render() {
    return (
      <ul id="nav-mobile"className="side-nav fixed">
        <li className="center no-padding">
          <div className="indigo darken-2 white-text" style={{ height: 180 }}>
            <div className="row">
              <i className="fa fa-user-circle fa-4x" style={{ marginTop: '5%' }} width={100} height={100} aria-hidden="true" />
              <p>
                {this.props.username }
              </p>
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
  // getAllGroupMessages: Proptypes.func.isRequired,
  handleChangeTodo: Proptypes.func.isRequired,
  todos: Proptypes.arrayOf(Proptypes.object).isRequired,
  username: Proptypes.string.isRequired,
  fetchTodos: Proptypes.func.isRequired,
};


export default connect(
  mapStateToProps,
  { fetchTodos, selectTodo }
)(SideBarComponent);
