import axios from 'axios';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import jwtDecode from 'jwt-decode';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from '../constants/actionTypes';

/**
 * @description action to set current user
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
 * @description action to update current user information
 *
 * @function updateCurrentUserSuccess
 *
 * @param {object} user
 *
 * @returns {object} action: type and user
 */
export function updateCurrentUserSuccess(user) {
  return {
    type: types.UPDATE_CURRENT_USER,
    user
  };
}
/**
 * @description action to update current user profile picture
 *
 * @function updateCurrentUserPictureSuccess
 *
 * @param {object} user
 *
 * @returns {object} action: type and user
 */
export function updateCurrentUserPictureSuccess(user) {
  return {
    type: types.UPDATE_CURRENT_USER_PICTURE,
    user
  };
}

/**
* @description action to signout user
*
* @function signOutSuccess
*
* @param {viod}
*
* @returns {string} type
*/

export function signOutSuccess() {
  return {
    type: types.SIGNOUT_USER_SUCCESS,
  };
}

/**
 * @description asyncronous function that logs out a user
 *
 * @function signOut
 *
 * @returns {object} dispatch an object
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
* @description asyncronous function that signs up a user
*
* @function signUp

* @param {object} user

* @returns {object} dispatch an object
*/

export function signUp(user) {
  return (dispatch) => {
    return axios.post('/api/v1/user/signup', user)
      .then((response) => {
        if (response.status === 201) {
          const { token } = response.data;
          setAuthorizationToken(token);
          dispatch(setCurrentUser(response.data.userObject));
          toastr.success('Registration successful');
          browserHistory.push('/dashboard');
        }
      })
      .catch((error) => {
        toastr.error(error.response.data.message);
      });
  };
}

/**
 * @description asynchronous function that signs in a user
 *
 * @function signIn
 *
 * @param {object} user
 *
 * @returns {object} dispatch object
 */

export function signIn(user) {
  return (dispatch => axios.post('/api/v1/user/signin', user)
    .then((response) => {
      if (response.status === 200) {
        const { token } = response.data;
        setAuthorizationToken(token);
        dispatch(setCurrentUser(response.data.userObject));
        toastr.success('Signed in Succesfully');
        browserHistory.push('/dashboard');
      }
    }).catch((err) => {
      toastr.error(err.response.data.message);
    })
  );
}
/**
 * @description asynchronous function that updates user information
 *
 * @function updateUser
 *
 * @param {object} user
 *
 * @returns {dispatch} an object
 */

export function updateUser(user) {
  return (dispatch => axios.put('api/v1/user', user)
    .then((response) => {
      const { token } = response.data;
      setAuthorizationToken(token);
      dispatch(updateCurrentUserSuccess(response.data.updatedUser));
      toastr.success('Profile updated');
    }).catch((err) => {
      toastr.error(err.response.data.message);
    })
  );
}
/**
 * @description asynchronous function that updates a user profile pics
 *
 * @function updateUserProfilePics
 *
 * @param {string} imageUrl
 *
 * @returns {object} dispatches an object
 */

export function updateUserProfilePicture(imageUrl) {
  return (dispatch => axios.put('api/v1/user/updateProfile', { imageUrl })
    .then((response) => {
      const { token } = response.data;
      setAuthorizationToken(token);
      dispatch(updateCurrentUserPictureSuccess(response.data.updatedUser));
      toastr.success('Profile updated');
    }).catch((err) => {
      toastr.error(err.response.data.message);
    })
  );
}

/**
 * @description asynchronous function that
 * signs in a user with google
 *
 * @function googleSignIn
 *
 * @param {object} user
 *
 * @returns {object} dispatches an object
 */
export function googleSignIn(user) {
  return (dispatch => axios.post('api/v1/user/googleLogin', user)
    .then((response) => {
      const { token } = response.data;
      setAuthorizationToken(token);
      dispatch(setCurrentUser(response.data.userObject));
      toastr.success('Signed in Succesfully');
      browserHistory.push('/dashboard');
    }).catch((err) => {
      toastr.error(err.response.data.message);
    })
  );
}

/**
 * @description asynchronous function
 * that helps reset user password when forgotten
 *
 * @function forgotPassword
 *
 * @param {object} email
 *
 * @returns {string} dispatch success message
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
 * @desc asynchronous function that reset users password
 *
 * @function resetPassword
 *
 * @param {string} newPassword
 * @param {string} retypePassword
 * @param {string} token
 *
 * @returns {sting} dispatch success message
 */
export function resetPassword({ newPassword, retypePassword, token }) {
  return (dispatch => axios
    .post('/api/v1/user/resetPassword', { newPassword, retypePassword, token })
    .then((response) => {
      toastr.success(response.data.message);
      browserHistory.push('/');
    }).catch((err) => {
      toastr.error(err.response.data.message);
    })
  );
}
