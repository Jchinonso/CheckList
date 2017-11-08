import axios from 'axios';
import toastr from 'toastr';
import * as types from '../constants/actionTypes';


/**
 * @desc create action: add collaborators to todo
 *
 * @function addCollaboratorSuccess
 *
 * @param {object} message
 *
 * @returns {object} action: type and message
 */
export function addCollaboratorSuccess(message) {
  return {
    type: types.ADD_COLLABORATOR_SUCCESS,
    message
  };
}

/**
 * get action: fetch all users
 *
 * @function fetchUserSuccess
 *
 * @param {object} users
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
 * @desc get action: fetch all todo collaborators
 *
 * @function fetchCollaboratorSuccess
 *
 * @param {object} collaborators
 *
 * @returns {object} action: type and members
 */
export function fetchCollaboratorSuccess(collaborators) {
  return {
    type: types.FETCH_COLLABORATOR_SUCCESS,
    collaborators
  };
}
/**
 * @desc create action: failure action for add collaborator
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
 * @desc async helper function: add Collaborator to Todo
 *
 * @function addCollaboratorTodo
 *
 * @param{integer} todoId,
 * @param{array} collaborator,
 *
 * @returns {function} asynchronous action
 */
export function addCollaboratorTodo(todoId, collaborator) {
  return (dispatch) => {
    axios.post(`/api/v1/group/${todoId}/collaborator`, collaborator)
      .then((response) => {
        toastr.success(response.data.message);
        dispatch(addCollaboratorSuccess(response.data.message));
      })
      .catch((err) => {
        toastr.error(err.response.data.message);
        dispatch(addCollaboratorFailure(err.response.data.message));
      });
  };
}

/**
 * @desc async helper function: add Members to Group
 *
 * @function fetchUsers
 *
 * @returns {function} asynchronous action
 */
export function fetchUsers() {
  return (dispatch) => {
    axios.get('/api/v1/users')
      .then((response) => {
        dispatch(fetchUserSuccess(response.data.allUsers));
      })
      .catch((err) => {
        toastr.error(err.response.data.message);
      });
  };
}

/**
 * @desc async helper function: fetches all collaborator in Todo
 *
 * @function fetchCollaborators
 * @param{integer} todoId
 *
 * @returns {function} asynchronous action
 */
export function fetchCollaborators(todoId) {
  return (dispatch) => {
    axios.get(`/api/v1/todos/${todoId}/collaborator`)
      .then((response) => {
        dispatch(fetchCollaboratorSuccess(response.data.collaborators));
      })
      .catch((err) => {
        toastr.error(err.response.data.message);
      });
  };
}

