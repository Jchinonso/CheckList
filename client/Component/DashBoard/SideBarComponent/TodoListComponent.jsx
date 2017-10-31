import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';

const GroupListItem = (props) => {
  const { handleChangeGroup, groups, activeGroup } = props;
  return (
    <ul>
      {groups.length !== 0 && groups.map(group =>
        (<li key={group.id} id="dashboard">
          <a
            id={group.id}
            className={classNames({
              card: true,
              'indigo lighten-5': group.id === activeGroup
            })}
            onClick={() => { handleChangeGroup(group.id); }}
            href="#?"
          ><span>{ group.name}</span></a>
        </li>)
      )}
    </ul>
  );
};
GroupListItem.defaultProps = {
  activeGroup: null
};

GroupListItem.propTypes = {
  groups: Proptypes.arrayOf(Proptypes.object).isRequired,
  handleChangeGroup: Proptypes.func.isRequired,
  activeGroup: Proptypes.number
};

export default GroupListItem;
