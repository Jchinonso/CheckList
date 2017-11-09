import React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTasks } from '../../../actions/tasksActions';
import CreateTaskComponent from '../MainComponent/CreateTaskComponent/Index.jsx';
import TodoBoardComponent from './TodoBoardComponent/Index.jsx';
import AddCollaborator from './AddCollaborator/Index.jsx';
import AddCollaboratorModal from './AddCollaborator/AddCollaboratorModal.jsx';


/**
 * @class MainComponent
 * @extends React.Component
 */
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      priority: 'normal',
      completed: false
    };
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleCheckChange(taskId, completed) {
    this.props.updateTasks(this.props.activeTodo, taskId, completed);
  }

  scrollToBottom() {
    const { messageList } = this;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollBottom = 0;
  }

  /**
   * render component
   * @method render
   * @member MainComponent
   * @returns {object} component
   */
  render() {
    $('#add-user').modal();
    $('.tooltipped').tooltip({ delay: 50 });
    return (
      <main>
        { this.props.activeTodo ?
          <AddCollaborator handleAddUserModal={this.handleAddUserModal} /> : null
        }
        <CreateTaskComponent />
        {this.props.todos.length === 0 ?
          <div id="no-messages">
            <p>Select a group or click the<q>plus</q> button to create group.</p>
          </div> : null
        }
        <AddCollaboratorModal />
        <div className="message-board" ref={(el) => { this.messageList = el; }} >
          <div className="container" id="task-container" >
            <ul id="task-card">
              <TodoBoardComponent
                handleCheckChange={this.handleCheckChange}
                tasks={this.props.tasks}
                username={this.props.username}
              />
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todosReducer.todos,
    activeTodo: state.activeTodoReducer,
    tasks: state.tasksReducer.tasks,
    completed: state.tasksReducer.completed,
    username: state.authReducer.user.username,
  };
}

MainComponent.defaultProps = {
  activeTodo: ''
};
MainComponent.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeTodo: PropTypes.string,
  username: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,

};


export default
connect(mapStateToProps, { updateTasks })(MainComponent);

