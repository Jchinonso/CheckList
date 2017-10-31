import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import GroupListItem from './GroupListItem.jsx';
import { fetchGroups, selectGroup } from '../../../actions/groupActions';
import { getAllGroupMessages } from '../../../actions/messageActions';

/**
 * @constructor
 * @extends React.Component
 * @param {object} props
 */
class SideBarComponent extends React.Component {
  componentDidMount() {
    this.props.fetchGroups()
      .then(() => {
        if (this.props.groups.length > 0) {
          this.props.selectGroup(this.props.groups[0].id);
          this.props.getAllGroupMessages(this.props.groups[0].id);
        }
      });
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
          <span>Groups</span>
          <a
            className="secondary-content  tooltipped modal-trigger"
            href="#modal1"
            data-position="right"
            data-delay="50"
            data-tooltip="Create New Group"
          >
            <span className="caption"> + </span>
          </a>
        </li>
        <GroupListItem handleChangeGroup={this.props.handleChangeGroup} groups={this.props.groups} activeGroup={this.props.activeGroup} />
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.authReducer.user.username,
    groups: state.groupReducer.groups,
    activeGroup: state.activeGroupReducer
  };
}

SideBarComponent.defaultProps = {
  activeGroup: null
};

SideBarComponent.propTypes = {
  activeGroup: Proptypes.number,
  selectGroup: Proptypes.func.isRequired,
  getAllGroupMessages: Proptypes.func.isRequired,
  handleChangeGroup: Proptypes.func.isRequired,
  groups: Proptypes.arrayOf(Proptypes.object).isRequired,
  username: Proptypes.string.isRequired,
  fetchGroups: Proptypes.func.isRequired,
};


export default connect(
mapStateToProps,
  { fetchGroups, selectGroup, getAllGroupMessages }
)(SideBarComponent);
