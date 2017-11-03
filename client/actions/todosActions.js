import { browserHistory } from 'react-router';
import axios from 'axios';
import toastr from 'toastr';
import * as types from '../constants/actionTypes';

/**
 * @desc create action: select a Todo
 *
 * @function selectTodo
 *
 * @param {string} TodoId
 *
 * @returns {object} action: type and TodoId
 */
export function selectTodo(TodoId) {
  return {
    type: types.SELECT_TODO,
    TodoId
  };
}
/**
 * @desc create action: create a todo: success
 *
 * @function createTodoSuccess
 *
 * @param {object} todo
 *
 * @returns {object} action: type and response
 */

export function createTodoSuccess(todo) {
  return {
    type: types.CREATE_TODO_SUCCESS,
    todo
  };
}
/**
 * @desc create action: create todo failure
 *
 * @function createTodoFailure
 *
 * @param {string} error
 *
 * @returns {object} action: type and error
 */
export function createTodoFailure(error) {
  return {
    type: types.CREATE_TODO_FAILURE,
    error
  };
}

/**
 * @desc async helper function: create a todo
 *
 * @function createTodo
 *
 * @param {string} name
 *
 * @returns {function} asynchronous action
 */

export function createTodo(text) {
  return dispatch => axios.post('/api/v1/todo', { text })
    .then((response) => {
      dispatch(createTodoSuccess(response.data.todo));
      toastr.success('Group Successfully Created');
    })
    .catch((error) => {
      dispatch(createTodoFailure(error.response.data.message));
      toastr.error(error.response.data.message);
    });
}

/**
 * @desc receive Todos action: receive a todo success
 *
 * @function receiveTodosSuccess
 *
 * @param {object} todos
 *
 * @returns {object} action: type and todos
 */

export function receiveTodosSuccess(todos) {
  return {
    type: types.RECEIVE_TODOS_SUCCESS,
    todos
  };
}
/**
 * @desc receive Todos action: receive a todo failure
 *
 * @function receiveTodosFailure
 *
 * @param {object} todos
 *
 * @returns {object} action: type and error
 */

export function receiveTodosFailure(error) {
  return {
    type: types.RECEIVE_TODOS_FAILURE,
    error
  };
}

/**
 * @desc async helper function: fetches all todos
 * @returns {function} asynchronous action
 */

export function fetchTodos() {
  return dispatch => axios.get('/api/v1/todo')
    .then((response) => {
      dispatch(receiveTodosSuccess(response.data.newTodo));
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });
}
