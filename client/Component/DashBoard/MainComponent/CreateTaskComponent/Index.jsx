import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { createTask } from '../../../../actions/tasksActions';
import TaskInputBox from './TaskInputBox.jsx';
import PriorityComponent from './PriorityComponent.jsx';


/**
 * @class MessageComposer
 * @extends {Component}
 */
class CreateTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      priority: 'normal',
      startDate: moment()
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.setPriority = this.setPriority.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  /**
   *
   * @method setPriority
   * @memberof ChatArea
   * @param {Object} event
   * @returns {void}
   */
  setPriority(event) {
    const priority = event.target.id;
    this.setState({
      priority
    });
  }

  /**
   *
   * @method handleSubmitMessage
   * @returns {void}
   * @memberof MessageArea
   * @param {any} event
   * @param {Function} callback
   */
  handleOnSubmit(event) {
    event.preventDefault();
    const { priority, text } = this.state;
    const taskData = {
      text: text.trim(),
      priority
    };
    this.props.createTask(this.props.activeTodo, taskData).then(() => {
      this.setState({ text: '', startDate: '' });
    });
  }

  /**
   *
   * @method handleInputChange
   * @memberof MessageArea
   * @param {any} event
   * @returns {void}
   */
  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @method handleInputChange
   * @memberof MessageArea
   * @param {any} event
   * @returns {void}
   */
  handleDateChange(date) {
    this.setState(this.setState({
      startDate: date
    }));
  }
  /**
   *
   * @method render
   * @memberof MessageArea
   * @returns {object} a chat area component
  */

  render() {
    return (
      <div>
        {this.props.activeTodo ?
          <div className="container" style={{marginLeft: 91 }}>
            <div className="message-input" style={{ paddingTop: '2%', minWidth: '70vw' }}>
              <form>
                <div className="row input-cover">
                  <TaskInputBox
                    handleOnChange={this.handleOnChange}
                    text={this.state.text}
                    handleDateChange={this.handleDateChange}
                    startDate={this.state.startDate}
                  />
                  <PriorityComponent
                    setPriority={this.setPriority}
                    defaultPriority={this.state.priority}
                  />
                  <div id="btn-input" style={{ paddingLeft: 20 }}>
                    <button
                      className="btn indigo waves-effect waves-light left"
                      type="submit"
                      onClick={this.handleOnSubmit}
                      name="action"
                    >
                      <i className="material-icons right">send</i>
                       Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div> : null
        }
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    activeTodo: state.activeTodoReducer,
    tasks: state.tasksReducer.tasks
  };
}
CreateTaskComponent.defaultProps = {
  activeTodo: ''
};
CreateTaskComponent.propTypes = {
  activeTodo: PropTypes.string,
  createTask: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { createTask })(CreateTaskComponent);
