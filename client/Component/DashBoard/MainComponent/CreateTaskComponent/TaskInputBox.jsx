import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';


export const TaskInputBox = (props) => {
  const { text, handleOnChange, handleDateChange } = props;
  return (
    <div className="input-field">
      <div className="input-box " style={{ paddingLeft: '2%', display: 'block' }}>
        <input
          type="text"
          onChange={handleOnChange}
          id="left-input"
          className="input-box_text "
          name="text"
          style={{ paddingLeft: '10px' }}
          value={text}
          placeholder="Create Task"
        />
      </div>
    </div>
  );
};

TaskInputBox.propTypes = {
  handleOnChange: Proptypes.func.isRequired,
  text: Proptypes.string.isRequired,
  handleDateChange: Proptypes.func.isRequired,
};


export default TaskInputBox;
