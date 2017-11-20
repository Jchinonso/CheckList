import { browserHistory } from 'react-router';
import axios from 'axios';
import toastr from 'toastr';

import * as types from '../constants/actionTypes';

/**
 * @description action creator that dipatch a todoId
 * based on the todo selected
 *
 * @function selectTodo
 *
 * @param {string} todoId
 *
 * @returns {object} action: type and todoId
 */
export function selectTodo(todoId) {
  return {
    type: types.SELECT_TODO,
    todoId
  };
}
/**
 * @description action creator that creates a todo
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
 * @description action creator that dispatches an
 *  error message when creating a todo fails
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
 * @description asychronous function that create a todo
 *
 * @function createTodo
 *
 * @param {string} text
 *
 * @returns {object} dispatch an object
 */

export function createTodo(text) {
  return dispatch => axios.post('/api/v1/todo', { text })
    .then((response) => {
      $('.modal').modal('close');
      dispatch(createTodoSuccess(response.data.todo));
      toastr.success('Todo Successfully Created');
    })
    .catch((error) => {
      dispatch(createTodoFailure(error.response.data.message));
      toastr.error(error.response.data.message);
    });
}

/**
 * @description asynchronous function that fetch todos
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
 * @description action creator that is dispatch
 * an error message when a todo is being fetched
 *
 * @function receiveTodosFailure
 *
 * @param {string} error
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
 * @description asynchronous function that
 * fetches all todos
 *
 * @function fetchTodos
 *
 * @returns {object} dispatches an object
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
