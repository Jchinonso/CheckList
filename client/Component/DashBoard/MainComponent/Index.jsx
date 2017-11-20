import React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateTaskComponent from '../MainComponent/CreateTaskComponent/Index.jsx';
import TodoBoardComponent from './TodoBoardComponent/Index.jsx';
import AddCollaborator from './AddCollaborator/Index.jsx';
import AddCollaboratorModal from './AddCollaborator/AddCollaboratorModal.jsx';
import { fetchUsers } from '../../../actions/collaboratorsAction';

/**
 * @class MainComponent
 * @extends React.Component
 */
class MainComponent extends React.Component {
  componentDidUpdate() {
    this.scrollToBottom();
  }
  /**
   * method that handles the todo board scrollbar
   *
   * @method scrollToBottom
   *
   * @member MainComponent
   *
   * @returns {void} void
   */
  scrollToBottom() {
    const { messageList } = this;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollBottom = 0;
  }

  /**
   * render component
   *
   * @method render
   *
   * @member MainComponent
   *
   * @returns {object} component
   */
  render() {
    $('#add-user').modal();
    $('.tooltipped').tooltip({ delay: 50 });
    return (
      <main>
        {this.props.activeTodo
          ? <AddCollaborator handleAddUserModal={this.handleAddUserModal} />
          : null}
        <CreateTaskComponent />
        {!this.props.showTodos &&
          <div id="no-messages">
            <p>
              Select a Todo or click the<q>plus</q> button to create Todo.
            </p>
          </div>}
        <AddCollaboratorModal />
        <div className="message-board" ref={(el) => { this.messageList = el; }}>
          <div className="container" id="task-container">
            <ul id="task-card">
              <TodoBoardComponent />
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    showTodos: state.todosReducer.todos.length > 0,
    activeTodo: state.activeTodoReducer.todoId,
  };
}

MainComponent.defaultProps = {
  activeTodo: '',
  showTodos: true,
};
MainComponent.propTypes = {
  showTodos: PropTypes.bool,
  activeTodo: PropTypes.string,
};

export default connect(mapStateToProps, null)(MainComponent);
