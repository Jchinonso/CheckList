import React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MessageBoardComponent from './MessageBoardComponent/Index.jsx';
import AddGroupUser from './AddGroupUser/Index.jsx';
import AddGroupUserModal from './AddGroupUser/AddGroupUserModal.jsx';


/**
 * @class MainComponent
 * @extends React.Component
 */
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      priority: 'normal'
    };
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const { messageList } = this;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  /**
   * render component
   * @method render
   * @member MainComponent
   * @returns {object} component
   */
  render() {
    $('#add-user').modal()
    $('.tooltipped').tooltip({delay: 50});
    return (
      <main>
        { this.props.activeGroup ?
          <AddGroupUser handleAddUserModal={this.handleAddUserModal} /> : null
        }
        {this.props.groups.length === 0 ?
          <div id="no-messages">
            <p>Select a group or click the<q>plus</q> button to create group.</p>
          </div> : null
        }
        <AddGroupUserModal />
        <div className="container" style={{ paddingLeft: '30px', width: '90%' }}>
          <div className="message-board" ref={(el) => { this.messageList = el; }} onScroll={this.onScroll} >
            <MessageBoardComponent messages={this.props.messages} username={this.props.username} />
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeGroup: state.activeGroupReducer,
    messages: state.groupMessagesReducer.messages,
    username: state.authReducer.user.username,
    groups: state.groupReducer.groups
  };
}

MainComponent.defaultProps = {
  activeGroup: null
};
MainComponent.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeGroup: PropTypes.number,
  username: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,

};


export default
  connect(mapStateToProps)(MainComponent);
