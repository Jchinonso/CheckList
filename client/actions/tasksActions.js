import { browserHistory } from 'react-router';
import axios from 'axios';
import toastr from 'toastr';

import * as types from '../constants/actionTypes';

/**
* @description action creator that dipatches error
messages when adding task fails
*
* @function addTaskFailure
*
* @param {string} error
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
* @description action creator that updates a single task
*
* @function updateTaskSuccess
*
* @param {object} task
*
* @returns {object} action: type and task
*/

export function updateTaskSuccess(taskId, userObject) {
  return {
    type: types.UPDATE_TASK_SUCCESS,
    taskId,
    userObject,
  };
}
/**
* @description action creator that updates
task completed status of a single task
*
* @function updateTaskStatusSuccess
*
* @param {object} task
*
* @returns {object} action: type and completed
*/

export function updateTaskStatusSuccess(taskId, completed) {
  return {
    type: types.UPDATE_TASK_STATUS,
    taskId,
    completed
  };
}
/**
* @description action creator that delete task from todo
*
* @function deleteTaskSuccess
*
* @param {string} taskId
*
* @returns {object} action: type and taskId
*/

export function deleteTaskSuccess(taskId) {
  return {
    type: types.DELETE_TASK_SUCCESS,
    taskId
  };
}
/**
* @description action creator that add task to Todo
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
 * @description action creator that fetches
 * tasks that belong to Todo
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
 * @description action creator that updates Task due date:
 *
 * @function updateTaskDueDateSuccess
 *
 * @param {object} dueDate
 *
 * @returns {object} action: type, taskId and dueDate
 */

function updateTaskDueDateSuccess(taskId, dueDate) {
  return {
    type: types.UPDATE_TASK_DUEDATE_SUCCESS,
    taskId,
    dueDate
  };
}

/**
* @description asynchronous function that creates task
*
* @function createTask
*
* @param {string} todoId
* @param {object} taskObject
*
* @returns {object} dispatch an object
*/

export function createTask(todoId, taskObject) {
  return dispatch => axios
    .post(`/api/v1/todos/${todoId}/task`, taskObject)
    .then((response) => {
      dispatch(addTaskSuccess(response.data.task));
    })
    .catch((error) => {
      dispatch(addTaskFailure(error.response.data.message));
      toastr.error(error.response.data.message);
    });
}

/**
 * @description asynchronous action that
 *  dispatch an error message when fetching a task fails
 *
 * @function receiveTasksFailure
 *
 * @param {string} error
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
 * @description asynchronous function that
 * fetches all tasks from todo
 *
 * @function fetchTasks
 *
 * @param {string} todoId
 *
 * @returns {object} dispatches an object
 */

export function fetchTasks(todoId) {
  return dispatch => axios
    .get(`/api/v1/todos/${todoId}/task`)
    .then((response) => {
      dispatch(receiveTasksSuccess(response.data.tasks));
    })
    .catch((error) => {
      dispatch(receiveTasksFailure(error.response.data));
      toastr.error(error.response.data.message);
    });
}

/**
* @description asynchronous function that updates a task
*
* @function updateTask
*
* @param {string} todoId
* @param {object} task
*
* @returns {object} dispatches an object
*/

export function updateTask(todoId, task) {
  return dispatch => axios
    .put(`/api/v1/todos/${todoId}/task/${task._id}`, task)
    .then((response) => {
      dispatch(updateTaskSuccess(task._id, response.data.editedTask));
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });
}
/**
* @description asynchronous function that updates task Status
*
* @function updateTaskDueDate
*
* @param {string} todoId
* @param {string} taskId
* @param {object} dueDate
*
* @returns {object} dispatch object
*/

export function updateTaskDueDate(todoId, taskId, dueDate) {
  return dispatch => axios
    .put(`/api/v1/todos/${todoId}/task/${taskId}`, { dueDate })
    .then((response) => {
      dispatch(updateTaskDueDateSuccess(taskId, dueDate));
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });
}
/**
* @description asynchronous function that
* update task completed Status
*
* @function updateTaskStatus
*
* @param {string} todoId
* @param {object} task
*
* @returns {object} dispatch an object
*/

export function updateTaskStatus(todoId, task) {
  return dispatch => axios.put(`/api/v1/todos/${todoId}/task/${task._id}`, {
    completed: !task.completed
  })
    .then((response) => {
      dispatch(updateTaskStatusSuccess(task._id, !task.completed));
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });
}
/**
* @description asynchronous function that
* delete task from todo
*
* @function deleteTask
*
* @param {string} todoId
* @param {string} taskId
*
* @returns {object} dispatch an object
*/

export function deleteTask(todoId, taskId) {
  return dispatch => axios.delete(`/api/v1/todos/${todoId}/task/${taskId}`)
    .then((response) => {
      dispatch(deleteTaskSuccess(taskId));
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });
}
