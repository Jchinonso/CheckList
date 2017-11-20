import expect from 'expect';

import authReducer from '../../reducers/authReducer';
import * as actions from '../../actions/authActions';


describe('auth reducer', () => {
  const user = {
    name: 'john doe',
    email: 'jodoe@gmail.com',
    username: 'jdoe'
  };
  const initialState = {
    isAuthenticated: false,
    user: { },
  };
  it('should signup a new user when SET_CURRENT_USER is passed', () => {
    const action = actions.setCurrentUser(user);
    const newState = authReducer(initialState, action);
    expect(newState.user).toEqual({
      name: 'john doe',
      email: 'jodoe@gmail.com',
      username: 'jdoe'
    });
    expect(newState.isAuthenticated).toEqual(true);
  });
  it('should update a user when UPDATE_CURRENT_USER is passed', () => {
    const action = actions.updateCurrentUserSuccess(user);
    const newState = authReducer(initialState, action);
    expect(newState.user).toEqual({
      name: 'john doe',
      email: 'jodoe@gmail.com',
      username: 'jdoe'
    });
    expect(newState.isAuthenticated).toEqual(true);
  });
  it('should update current user profile pics' +
  'when UPDATE_CURRENT_USER_PICTURE is passed',
  () => {
    const userObject = {
      name: 'john doe',
      email: 'jodoe@gmail.com',
      username: 'jdoe',
      imageUrl: 'http//pics.example.com'
    };
    const action = actions.updateCurrentUserPictureSuccess(userObject);
    const newState = authReducer(initialState, action);
    expect(newState.user).toEqual({
      name: 'john doe',
      email: 'jodoe@gmail.com',
      username: 'jdoe',
      imageUrl: 'http//pics.example.com'
    });
    expect(newState.isAuthenticated).toEqual(true);
  });
  it('should signOut a user when SIGNOUT_SUCCESS is passed', () => {
    const action = actions.signOutSuccess();
    const newState = authReducer(initialState, action);
    expect(newState.isAuthenticated).toEqual(false);
  });
});
