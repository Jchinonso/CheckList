import { browserHistory } from 'react-router';
import axios from 'axios';
import toastr from 'toastr';
import * as types from '../constants/actionTypes';

/**
* @desc receive tasks action: add task failure
*
* @function addTaskFailure
*
* @param {object} error
*
* @returns {object} action: type and error
*/

export function addTaskFailure(error) {
  return {
    type: types.ADD_TASK_FAILURE,
    error
  };
}
/**
* @desc add tasks action: add task success
*
* @function addTaskSuccess
*
* @param {object} task
*
* @returns {object} action: type and task
*/

export function addTaskSuccess(task) {
  return {
    type: types.ADD_TASK_SUCCESS,
    task
  };
}

/**
* @desc async helper function: create task
* @returns {function} asynchronous action
*/

export function createTask(todoId, taskObject) {
  return dispatch => axios.get(`/api/v1/todos/${todoId}/task`)
    .then((response) => {
      dispatch(addTaskSuccess(response.data.newTodo));
    })
    .catch((error) => {
      dispatch(addTaskFailure(error.response.data.message));
      toastr.error(error.response.data.message);
    });
}
/**
 * @desc receive Task action: receive a task success
 *
 * @function receiveTasksSuccess
 *
 * @param {object} tasks
 *
 * @returns {object} action: type and tasks
 */

export function receiveTasksSuccess(tasks) {
  return {
    type: types.RECEIVE_TASKS_SUCCESS,
    tasks
  };
}
/**
 * @desc receive Task action: receive a task failure
 *
 * @function receiveTasksFailure
 *
 * @param {object} tasks
 *
 * @returns {object} action: type and error
 */

export function receiveTasksFailure(error) {
  return {
    type: types.RECEIVE_TASKS_FAILURE,
    error
  };
}

/**
 * @desc async helper function: fetches all tasks
 * @returns {function} asynchronous action
 */

export function fetchTasks() {
  return dispatch => axios.get('/api/v1/todos')
    .then((response) => {
      dispatch(receiveTasksSuccess(response.data.newTodo));
    })
    .catch((error) => {
      dispatch(receiveTasksFailure(error.response.data));
      toastr.error(error.response.data.message);
    });
}

