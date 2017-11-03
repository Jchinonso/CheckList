import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';

const TodoBoardComponent = (props) => {
  const { messages, username } = props;
  return (
    <div>
      {messages && messages.length !== 0 && messages.map(message =>
        (<li className="card" style={{ touchAction: 'pan-y', WebkitUserDrag: 'none', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', padding: '10px 15px' }}>
          <div className="row">
            <div className="col s4 m4">
              <input type="checkbox" id="task1" />
              <label htmlFor="task1" style={{ textDecoration: 'line-through' }}>Create Mobile App UI.</label>
            </div>
            <div className="col s2 m2 right">
              <div className="task-cat teal">Priority</div>
              <div className="task-cat">Due date</div>
            </div>
            <div className="col s4 m4 right">
              <div className="task-cat teal">Task completer</div>
            </div>
          </div>
        </li>))}
    </div>
  );
};

TodoBoardComponent.propTypes = {
  messages: Proptypes.arrayOf(Proptypes.object).isRequired,
  username: Proptypes.string.isRequired
};


export default TodoBoardComponent;
