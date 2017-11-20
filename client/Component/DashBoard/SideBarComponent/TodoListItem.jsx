import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';

const TodoListItem = (props) => {
  const { handleChangeTodo, todos, activeTodo } = props;
  return (
    <ul>
      {todos.length !== 0 && todos.map(todo =>
        (<li
          key={todo._id}
          id="dashboard"
        >
          <a
            id={todo._id}
            className={classNames({
              card: true,
              'indigo lighten-5': todo._id === activeTodo
            })}
            onClick={() => { handleChangeTodo(todo._id); }}
            href="#?"
          ><span>{ todo.text}</span>
          </a>
        </li>
        ))
      }
    </ul>
  );
};
TodoListItem.defaultProps = {
  activeTodo: ''
};

TodoListItem.propTypes = {
  todos: Proptypes.arrayOf(Proptypes.object).isRequired,
  handleChangeTodo: Proptypes.func.isRequired,
  activeTodo: Proptypes.string
};

export default TodoListItem;
