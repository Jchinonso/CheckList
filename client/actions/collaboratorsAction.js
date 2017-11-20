import axios from 'axios';
import toastr from 'toastr';

import * as types from '../constants/actionTypes';


/**
 * @description action creator that adds
 * collaborators to a todo
 *
 * @function addCollaboratorSuccess
 *
 * @param {object} message
 *
 * @returns {object} type and message
 */
export function addCollaboratorSuccess(message) {
  return {
    type: types.ADD_COLLABORATOR_SUCCESS,
    message
  };
}

/**
 * @description action creator that
 * fetches all users
 *
 * @function fetchUserSuccess
 *
 * @param {array} users
 *
 * @returns {object} action: type and users
 */
export function fetchUserSuccess(users) {
  return {
    type: types.FETCH_USERS_SUCCESS,
    users
  };
}

/**
 * @description action creator that
 * fetches todo collaborators
 *
 * @function fetchCollaboratorSuccess
 *
 * @param {array} collaborators
 *
 * @returns {object} action: type and collaborators
 */
export function fetchCollaboratorSuccess(collaborators) {
  return {
    type: types.FETCH_COLLABORATOR_SUCCESS,
    collaborators
  };
}
/**
 * @description action creator
 * that is dispatch when adding collaborator fails
 *
 * @function addCollaboratorFailure
 *
 * @param {object} error
 *
 * @returns {object} action: type and error
 */
export function addCollaboratorFailure(error) {
  return {
    type: types.ADD_COLLABORATOR_FAILURE,
    error
  };
}

/**
 * @description asynchronous function that
 *  add Collaborators to Todo
 *
 * @function addCollaboratorTodo
 *
 * @param{integer} todoId,
 * @param{array} collaborator,
 *
 * @returns {object} dispatches an object
 */
export function addCollaboratorTodo(todoId, collaborator) {
  return (dispatch) => {
    $('.modal').modal('close');
    return axios.post(`/api/v1/todos/${todoId}/collaborator`, collaborator)
      .then((response) => {
        toastr.success('Collaborators successfully added');
        dispatch(addCollaboratorSuccess(response.data.message));
      })
      .catch((err) => {
        toastr.error(err.response.data.message);
        dispatch(addCollaboratorFailure(err.response.data.message));
      });
  };
}

/**
 * @description asynchronous function that fetches
 * all users
 *
 * @function fetchUsers
 *
 * @returns {object} dispatches an object
 */
export function fetchUsers() {
  return (dispatch) => {
    return axios.get('/api/v1/users')
      .then((response) => {
        dispatch(fetchUserSuccess(response.data.allUsers));
      })
      .catch((err) => {
        toastr.error(err.response.data.message);
      });
  };
}

/**
 * @description asynchronous function that
 * fetches all collaborator from Todo
 *
 * @function fetchCollaborators
 * @param {integer} todoId
 *
 * @returns {object} dispatches an object
 */
export function fetchCollaborators(todoId) {
  return (dispatch) => {
    return axios.get(`/api/v1/todos/${todoId}/collaborator`)
      .then((response) => {
        dispatch(fetchCollaboratorSuccess(response.data.collaborators));
      })
      .catch((err) => {
        toastr.error(err.response.data.message);
      });
  };
}

