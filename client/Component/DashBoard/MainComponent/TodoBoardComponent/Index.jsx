import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

const TodoBoardComponent = (props) => {
  const { tasks, username, handleCheckChange } = props;

  return (
    <div>
      {tasks && tasks.length !== 0 && tasks.map(task =>
        (<li
          key={task._id}
          className={classNames({
            card: true,
            'priority-normal': task.priority === 'normal',
            'priority-urgent': task.priority === 'urgent',
            'priority-critical': task.priority === 'critical',
          })}
          style={{ touchAction: 'pan-y', WebkitUserDrag: 'none', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', padding: '10px 15px' }}
        >
          <div className="row">
            <div className="col s4 m4">
              <button
                className="btn waves-effect waves-light left"
                type="submit"
                id={task._id}
                name="action"
                style={{ backgroundColor: '#F5F5DC', color: 'black' }}
                onClick={() => { handleCheckChange(task._id, !task.completed); }}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
            </div>
            <div className="col s4 m4">
              <div className="col s2 m2">
                <h5
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                >
                  {task.text}
                </h5>
              </div>
            </div>
            <div className="col s2 m2 right">
              <div className="task-cat">{task.priority}</div>
              <div className="task-cat">Due date</div>
            </div>
          </div>
        </li>))}
    </div>
  );
};

TodoBoardComponent.propTypes = {
  tasks: Proptypes.arrayOf(Proptypes.object).isRequired,
  username: Proptypes.string.isRequired,
  handleCheckChange: Proptypes.func.isRequired,
};


export default TodoBoardComponent;
