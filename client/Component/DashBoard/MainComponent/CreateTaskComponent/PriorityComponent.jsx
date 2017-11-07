import React from 'react';
import Proptypes from 'prop-types';


const PriorityComponent = (props) => {
  const { defaultPriority, setPriority } = props;
  return (
    <div className="select-priority-2" style={{ paddingLeft: 50, paddingRight: '8%', float: 'right' }}>
      <span>
        <input
          name="group1"
          type="radio"
          id="normal"
          checked={defaultPriority === 'normal'}
          onChange={setPriority}
        />
        <label htmlFor="normal">Normal</label>
      </span>
      <span>
        <input
          className="with-gap"
          name="group3"
          type="radio"
          id="urgent"
          checked={defaultPriority === 'urgent'}
          onChange={setPriority}
        />
        <label htmlFor="urgent">Urgent</label>
      </span>
      <span>
        <input
          className="with-gap"
          name="group3"
          type="radio"
          id="critical"
          checked={defaultPriority === 'critical'}
          onChange={setPriority}
        />
        <label htmlFor="critical">Critical</label>
      </span>
    </div>
  );
};

PriorityComponent.propTypes = {
  setPriority: Proptypes.func.isRequired,
  defaultPriority: Proptypes.string.isRequired
};


export default PriorityComponent;
