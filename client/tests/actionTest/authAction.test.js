import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as router from 'react-router';
import localStorageMock from '../../__Mock__/localStorageMock';

import * as actions from '../../actions/authActions';
import * as types from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = localStorageMock;
router.browserHistory = { push: () => {} };

describe('user synchronous actions', () => {
  describe('action set current user', () => {
    it('should set the current user', () => {
      const user = {
        _id: '1234',
        username: 'jchinonso',
        name: 'johnson chinonso',
        email: 'jdoe@gmail.com'
      };
      const expectedAction = {
        type: types.SET_CURRENT_USER,
        user
      };
      expect(actions.setCurrentUser(user)).toEqual(expectedAction);
    });
  });
  describe('action update current user success', () => {
    it('update current user', () => {
      const user = {
        _id: '1234',
        username: 'jchinonso',
        name: 'johnson smason',
        email: 'jchinonso@gmail.com'
      };
      const expectedAction = {
        type: types.UPDATE_CURRENT_USER,
        user
      };
      expect(actions.updateCurrentUserSuccess(user)).toEqual(expectedAction);
    });
  });
  describe('action update current user profile pics success', () => {
    it('should update current user', () => {
      const user = {
        _id: '1234',
        username: 'jchinonso',
        name: 'johnson smason',
        email: 'jchinonso@gmail.com',
        imageUrl: 'http://res.cloudinary.com/dbczzmftw/image/upload/v1509127904/pojdk9ajmdgase3esgg2.png'
      };
      const expectedAction = {
        type: types.UPDATE_CURRENT_USER_PICTURE,
        user
      };
      expect(actions.updateCurrentUserPicSuccess(user)).toEqual(expectedAction);
    });
  });
  describe('action signout user success', () => {
    it('should signout current user', () => {
      const expectedAction = {
        type: types.SIGNOUT_USER_SUCCESS,
      };
      expect(actions.signOutSuccess()).toEqual(expectedAction);
    });
  });
});

describe('User asynchronous actions', () => {
  describe('Signup Action', () => {
    it('Should make a post request to sign up user', async () => {
      const userObject = {
        username: 'jchinonso',
        name: 'johnson chinonso',
        email: 'johnsonchinonso@gmail.com',
        password: 'poly12'
      };
      const response = {
        status: 201,
        data: {
          userObject: {
            userId: '11214124124',
            username: 'jchinonso',
            name: 'johnson smason',
            email: 'jchinonso@gmail.com'
          },
          token: '12234432653553232'
        },
        message: 'Successfully Signed Up',
      };
      const expectedAction =
        {
          type: types.SET_CURRENT_USER,
          user: {
            userId: '11214124124',
            username: 'jchinonso',
            name: 'johnson smason',
            email: 'jchinonso@gmail.com'
          }
        };

      axios.post = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ user: {}, expectedAction });
      await store.dispatch(actions.signUp(userObject)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(types.SET_CURRENT_USER);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
  describe('Signin Action', () => {
    it('Should make a post request to sign in user', async () => {
      const userObject = {
        email: 'johnsonchinonso@gmail.com',
        password: 'poly12'
      };
      const response = {
        status: 200,
        data: {
          userObject: {
            userId: '11214124124',
            username: 'jchinonso',
            name: 'johnson smason',
            email: 'jchinonso@gmail.com'
          },
          token: '12234432653553232'
        },
        message: 'Signed in successfully',
      };
      const expectedAction =
        {
          type: types.SET_CURRENT_USER,
          user: {
            userId: '11214124124',
            username: 'jchinonso',
            name: 'johnson smason',
            email: 'jchinonso@gmail.com'
          }
        };

      axios.post = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ user: {}, expectedAction });
      await store.dispatch(actions.signIn(userObject)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(types.SET_CURRENT_USER);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
  describe('Update User Action', () => {
    it('Should make a put request to update user', async () => {
      const userObject = {
        username: 'jchinonso',
        name: 'johnson micheal',
        email: 'jmicheal@gmail.com'
      };
      const response = {
        status: 200,
        data: {
          updatedUser: {
            userId: '11214124124',
            username: 'jchinonso',
            name: 'johnson micheal',
            email: 'jmicheal@gmail.com'
          },
          token: '12234432653553232'
        },
        message: 'Profile updated',
      };
      const expectedAction =
        {
          type: types.UPDATE_CURRENT_USER,
          user: {
            userId: '11214124124',
            username: 'jchinonso',
            name: 'johnson micheal',
            email: 'jmicheal@gmail.com'
          }
        };

      axios.put = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ user: {}, expectedAction });
      await store.dispatch(actions.updateUser(userObject)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(types.UPDATE_CURRENT_USER);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
  describe('Update User Profile Action', () => {
    it('Should make a put request to update user profile picture', async () => {
      const userObject = {
        imageUrl: 'http://res.cloudinary.com/dbczzmftw/image/upload/v1509127904/pojdk9ajmdgase3esgg2.png',
      };
      const response = {
        status: 200,
        data: {
          updatedUser: {
            userId: '11214124124',
            imageUrl: 'http://res.cloudinary.com/dbczzmftw/image/upload/v1509127904/pojdk9ajmdgase3esgg2.png',
            username: 'jchinonso',
            name: 'johnson micheal',
            email: 'jmicheal@gmail.com'
          },
          token: '12234432653553232'
        },
        message: 'Profile updated',
      };
      const expectedAction =
        {
          type: types.UPDATE_CURRENT_USER_PICTURE,
          user: {
            userId: '11214124124',
            username: 'jchinonso',
            imageUrl: 'http://res.cloudinary.com/dbczzmftw/image/upload/v1509127904/pojdk9ajmdgase3esgg2.png',
            name: 'johnson micheal',
            email: 'jmicheal@gmail.com'
          }
        };

      axios.put = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ user: {}, expectedAction });
      await store.dispatch(actions.updateUserProfilePics(userObject)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(types.UPDATE_CURRENT_USER_PICTURE);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
  describe('Google Sigin in', () => {
    it('Should signin with google', async () => {
      const userObject = {
        email: 'jchinonso@gmail.com',
        name: 'johnson smason',
        usernam: 'jchinonso',
        password: 'poly12'
      };
      const response = {
        status: 201,
        data: {
          userObject: {
            userId: '11214124124',
            username: 'jchinonso',
            name: 'johnson smason',
            email: 'jchinonso@gmail.com'
          },
          token: '12234432653553232'
        },
        message: 'Signed in successfully',
      };
      const expectedAction =
        {
          type: types.SET_CURRENT_USER,
          user: {
            userId: '11214124124',
            username: 'jchinonso',
            name: 'johnson smason',
            email: 'jchinonso@gmail.com'
          },
        };

      axios.put = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ user: {}, expectedAction });
      await store.dispatch(actions.googleSignIn(userObject)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(types.SET_CURRENT_USER);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
});
