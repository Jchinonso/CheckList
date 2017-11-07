import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';


const TaskInputBox = (props) => {
  const { text, handleOnChange, handleDateChange, startDate } = props;
  return (
    <div className="input-field">
      <table>
        <tbody>
          <tr>
            <td style={{ width: '80%' }}>
              <div className="input-box " style={{ paddingLeft: '2%', display: 'block' }}>
                <input
                  type="text"
                  onChange={handleOnChange}
                  id="left-input"
                  className="input-box_text "
                  name="text"
                  value={text}
                  placeholder="Create Task"
                />
              </div>
            </td>
            <td>
              <div className="input-box ">
                <DatePicker
                  id="right-input"
                  selected={startDate}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="LLL"
                  placeholderText="Due Date"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

TaskInputBox.propTypes = {
  handleOnChange: Proptypes.func.isRequired,
  text: Proptypes.string.isRequired
};


export default TaskInputBox;
