import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import
{ updateTask, updateTaskStatus, updateTaskDueDate, deleteTask }
  from '../../../../actions/tasksActions';
import {
  checkStateDueDate
} from '../../../../helper/clientSideValidation';

export class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      edited: false,
      dueDate: moment(),
      date: '',
      text: this.props.task.text
    };
    this.toggleCancel = this.toggleCancel.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  /**
   *
   * Enable the user to edit
   * task by changing edited state to true
   *
   * @method toggleEdit
   *
   * @member TaskItem
   *
   * @param {event} event
   *
   * @returns {void} void
   */
  toggleEdit(event) {
    this.setState({
      edited: true
    });
  }

  /**
   * Handle task status change based on the completed value
   *
   * @method handCheckChange
   *
   * @member TaskItem
   *
   * @param {void} void
   *
   * @returns {function} dispatch updateTaskStatus Action
   */

  handleCheckChange() {
    const { task, todoId } = this.props;
    this.props.updateTaskStatus(todoId, task);
  }

  /**
   * Handle onChange events on form inputs
   *
   * @method handleOnChange
   *
   * @member TaskItem
   *
   * @param {object} event
   *
   * @returns {function} a function that handles change event on inputs
   */

  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
  * Delete task
  *
  * @method handleDelete
  *
  * @member TaskItem
  *
  * @param {event} event
  *
  * @returns {function} dispatch deleteTask Action
  */

  handleDelete(event) {
    const { task, todoId } = this.props;
    this.props.deleteTask(todoId, task._id);
  }

  /**
  * Update task
  *
  * @method handleUpdateTask
  *
  * @member TaskItem
  *
  * @param {event} event
  *
  * @returns {function} dispatch updateTask Action
  */

  handleUpdateTask(event) {
    event.preventDefault();
    const { task, todoId } = this.props;
    const { text, edited } = this.state;
    this.props.updateTask(todoId, { ...task, text }).then(() => {
      this.setState({
        edited: !edited
      });
    });
  }
  /**
   * Select the due date for task
   * @method handleDateChange
   *
   * @member TaskItem
   *
   * @param {*} date the date selected in date picker
   *
   * @return {*} null
   */
  handleDateChange(date) {
    const { task, todoId } = this.props;
    this.setState({
      dueDate: date,
      isOpen: !this.state.isOpen
    });
    this.props.updateTaskDueDate(todoId, task._id, date._d);
  }
  /**
  *  Return to application screen from calendar modal
  * @method toggleCalender
  *
  * @member TaskItem
  *
  * @param {event}  event the date selected in date picker
  *
  * @return {void} void
  */
  toggleCalendar(event) {
    event.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  }
  /**
  * Toggle cancel
  *
  * @method toggleCancel
  *
  * @member TaskItem
  *
  * @param {event} event
  *
  * @returns {function} new set state
  */
  toggleCancel(event) {
    this.setState({
      edited: false
    });
  }
  render() {
    const { task } = this.props;
    const selectedDueDate = checkStateDueDate(
      this.state.dueDate,
      this.props.task.dueDate
    );
    const selectedDueDateFormat = moment(selectedDueDate).format('DD-MM-YYYY');
    const diffBtwMoments = moment(selectedDueDate).diff(moment(moment()));
    const hours = Math.ceil(moment.duration(diffBtwMoments).asHours());
    const days = Math.ceil(moment.duration(diffBtwMoments).asDays());
    return (
      <li
        key={task._id}
        id={task._id}
        className={classNames({
          card: true,
          'priority-normal': task.priority === 'normal',
          'priority-urgent': task.priority === 'urgent',
          'priority-critical': task.priority === 'critical',
        })}
        style={{
          touchAction:
          'pan-y',
          WebkitUserDrag: 'none',
          WebkitTapHighlightColor:
          'rgba(0, 0, 0, 0)',
          padding: '10px 15px'
        }}
      >
        <form>
          <div className={classNames({
            row: true,
            hidden: !this.state.edited
          })}
          >
            <div className="col s12 m6">
              <input
                type="text"
                name="text"
                onChange={this.handleOnChange}
                value={this.state.text}
              />
            </div>
            <div className="col s4 m3">
              <button
                className="task-cat btn"
                onClick={this.handleUpdateTask}
              >Save
              </button>
            </div>
            <div className="col s3 m3 right">
              <div className="task-cat ">
                <a
                  className="btn-floating waves-effect waves-light red"
                  href="#?"
                  id={task._id}
                  onClick={this.toggleCancel}
                >
                  <i className="material-icons">close</i>

                </a>
              </div>
            </div>
          </div>
          <div className={classNames({
            row: true,
            hidden: this.state.edited
          })}
          >
            <div className="col s8 m8">
              <div className="row">
                <span
                  htmlFor="task1"
                  className={classNames({
                    newspan: true,
                    strikethrough: task.completed
                  })}
                >
                  {task.text}
                </span>
              </div>
              <div className="row">
                <div className="due-date">
                  {
                    diffBtwMoments > 0 && !task.completed ?
                      <div>
                        <span
                          className="color grey-text due-date-reminder-hours"
                        >
                          {hours} hours left
                        </span>
                        <span
                          className="color grey-text due-date-reminder-days"
                        >
                          {days} day(s) left
                        </span>
                      </div>
                      :
                      null
                  }
                </div>
              </div>
            </div>
            <div className="col s12 m4 tas-btn ">
              <div className="task-cat right" style={{ marginBottom: '10px' }}>
                <a
                  className="btn-floating waves-effect waves-light btn-task blue"
                  href="#?"
                  onClick={this.toggleEdit}
                >
                  <i className="material-icons">
                    create
                  </i>
                </a>
                <a
                  className="btn-floating waves-effect waves-light btn-task teal"
                  style={{ paddingRight: '10px' }}
                  href="#?"
                  onClick={this.handleCheckChange}
                >
                  {task.completed ?
                    <i className="material-icons">check_circle</i> :
                    <i className="material-icons">check_box_outline_blank</i>
                  }
                </a>
                <a
                  className="btn-floating waves-effect waves-light btn-task red"
                  style={{ paddingRight: '10px' }}
                  href="#?"
                  onClick={this.handleDelete}
                >
                  <i className="material-icons">delete</i>
                </a>
              </div>
              <div>
                <button
                  className="task-cat btn right"
                  onClick={this.toggleCalendar}
                >
                  {this.state.dueDate.format('DD-MM-YYYY')}
                </button>
                {
                  this.state.isOpen && (
                    <DatePicker
                      selected={this.state.dueDate}
                      onChange={this.handleDateChange}
                      minDate={moment()}
                      withPortal
                      inline
                    />
                  )
                }
              </div>


            </div>
          </div>
        </form>
      </li>);
  }
}

TaskItem.propTypes = {
  updateTaskStatus: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  todoId: PropTypes.string.isRequired
};
export default connect(
  null,
  {
    updateTask, updateTaskStatus, updateTaskDueDate, deleteTask
  }
)(TaskItem);
