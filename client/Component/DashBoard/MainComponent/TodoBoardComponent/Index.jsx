import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import moment from 'moment';

import TaskItem from './TaskItem.jsx';

export const TodoBoardComponent = ({ tasks, activeTodo }) => (
  <div>
    {
      tasks.map(task => (<TaskItem
        key={task._id}
        task={task}
        todoId={activeTodo}
      />))
    }
  </div>
);

TodoBoardComponent.propTypes = {
  tasks: Proptypes.arrayOf(Proptypes.object).isRequired,
  activeTodo: Proptypes.string
};

TodoBoardComponent.defaultProps = {
  activeTodo: '',
  tasks: [],
};

function mapStateToProps(state) {
  return {
    activeTodo: state.activeTodoReducer.todoId,
    tasks: state.tasksReducer.tasks,
  };
}

export default connect(
  mapStateToProps,
  null
)(TodoBoardComponent);
