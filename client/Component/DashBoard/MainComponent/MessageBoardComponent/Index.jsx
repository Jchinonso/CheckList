import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';

const MessageBoardComponent = (props) => {
  const { messages, username } = props;
  return (
    <div>
      {messages && messages.length !== 0 && messages.map(message =>
        (<div className="card" style={{ padding: ' 10px 15px 10px 15px' }} key={message.id}>
          <div className="row">
            <div className="col s8 m8 l8">
              <a href="#?"><span className="author-name">{message.sender}</span></a>
              <div className="message">{message.content}</div>
            </div>
            <div className="col s2 m2 l2 right">
              <a href=""><span style={{ paddingBottom: '5px' }}> {message.priority} </span></a>
              <div className="message-date">{moment(new Date(message.createdAt)).fromNow()}</div>
            </div>
          </div>
        </div>)
      )}
    </div>
  );
};

MessageBoardComponent.propTypes = {
  messages: Proptypes.arrayOf(Proptypes.object).isRequired,
  username: Proptypes.string.isRequired
};


export default MessageBoardComponent;
