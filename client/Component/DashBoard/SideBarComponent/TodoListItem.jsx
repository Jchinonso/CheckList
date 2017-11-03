import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';

const TodoListItem = (props) => {
  const { handleChangeGroup, todos, activeGroup } = props;
  return (
    <ul>
      {todos.length !== 0 && todos.map(todo =>
        (<li key={todo._id} id="dashboard">
          <a
            id={todo._id}
            className={classNames({
              card: true,
              'indigo lighten-5': todo._id === activeGroup
            })}
            onClick={() => { handleChangeGroup(group._id); }}
            href="#?"
          ><span>{ todo.text}</span>
          </a>
        </li>)
      )}
    </ul>
  );
};
TodoListItem.defaultProps = {
  activeGroup: null
};

TodoListItem.propTypes = {
  todos: Proptypes.arrayOf(Proptypes.object).isRequired,
  handleChangeGroup: Proptypes.func.isRequired,
  activeGroup: Proptypes.number
};

export default TodoListItem;
