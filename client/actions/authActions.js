import axios from 'axios';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from '../constants/actionTypes';

/**
 * @desc create action:set current user
 *
 * @function setCurrentUser
 *
 * @param {object} user
 *
 * @returns {object} action: type and user
 */
export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}
/**
* @desc create action:signup user failure

* @function signUpFailure

* @param {object} error

* @returns {object} action: type and error
*/
export function logError(error) {
  return {
    type: types.LOG_ERROR,
    error
  };
}

/**
* @desc create action:signout user success
*
* @function signOutSuccess
*
* @param {viod}
*
* @returns {void}
*/

export function signOutSuccess() {
  return {
    type: types.SIGNOUT_USER_SUCCESS,
  };
}
/**
 * @desc async helper function: log out user
 *
 * @function logOutUser
 *
 * @returns {function} asynchronous action
 */
export function signOut() {
  return (dispatch) => {
    window.localStorage.removeItem('tokenize');
    setAuthorizationToken(false);
    dispatch(signOutSuccess());
    toastr.success('Successfully Log out');
    browserHistory.push('/');
  };
}

/**
* @desc async helper function: sign up user
*
* @function signUpUser
*
* @param {string} username
* @param {string} password
* @param {string} email
* @param {string} phone number
*
* @returns {function} asynchronous action
*/

export function signUp(user) {
  return dispatch => axios.post('/api/v1/user/signup', user)
    .then((response) => {
      if (response.status === 201) {
        const { token } = response.data;
        window.localStorage.setItem('tokenize', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
        toastr.success('Registration successful');
        browserHistory.push('/dashboard');
      }
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
      dispatch(logError(error.response.data.message));
    });
}

/**
 * @desc async helper function: sign in user
 *
 * @function signInUser
 *
 * @param {string} username
 * @param {string} password
 *
 * @returns {function} asynchronous action
 */

export function signIn(user) {
  return (dispatch => axios.post('/api/v1/user/signin', user)
    .then((response) => {
      if (response.status === 200) {
        const { token } = response.data;
        window.localStorage.setItem('tokenize', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
        toastr.success('Signed in Succesfully');
        browserHistory.push('/dashboard');
      }
    }).catch((err) => {
      toastr.error(err.response.data.message);
      dispatch(logError(err.response.data.message));
    })
  );
}

/**
 * @desc async helper function: sign in user
 *
 * @function googleSignIn
 *
 * @param {string} user
 *
 * @returns {function} asynchronous action
 */
export function googleSignIn(user) {
  return (dispatch => axios.post('api/v1/user/googleLogin', user)
    .then((response) => {
      const { token } = response.data;
      window.localStorage.setItem('tokenize', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
      toastr.success('Signed in Succesfully');
      browserHistory.push('/dashboard');
    }).catch((err) => {
      toastr.error(err.response.data.message);
    })
  );
}

/**
 * @desc async helper function: sign in user
 *
 * @function forgotPassword
 *
 * @param {object} email
 *
 * @returns {function} asynchronous action
 */
export function forgotPassword(email) {
  return (dispatch => axios.post('/api/v1/user/forgotPassword', { email })
    .then((response) => {
      toastr.success(response.data.message);
      browserHistory.push('/');
    }).catch((err) => {
      toastr.error(err.response.data.message);
    })
  );
}
/**
 * @desc async helper function: sign in user
 *
 * @function forgotPassword
 *
 * @param {object} email
 *
 * @returns {function} asynchronous action
 */
export function resetPassword({ newPassword, retypePassword, token }) {
  return (dispatch => axios.post('/api/v1/user/resetPassword', { newPassword, retypePassword, token })
    .then((response) => {
      toastr.success(response.data.message);
      browserHistory.push('/');
    }).catch((err) => {
      toastr.error(err.response.data.message);
    })
  );
}
