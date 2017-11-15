import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';


import * as actions from '../../actions/collaboratorsAction';
import * as types from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Collaborator synchronous actions', () => {
  describe('action add collaborators to todo', () => {
    it('should add collaborator to todo', () => {
      const message = 'Collaborator successfully added to todo'
      const expectedAction = {
        type: types.ADD_COLLABORATOR_SUCCESS,
        message
      };
      expect(actions.addCollaboratorSuccess(message)).toEqual(expectedAction);
    });
    it('should not add collaborator to todo if user does not exist', () => {
      const error = 'User does not exist';
      const expectedAction = {
        type: types.ADD_COLLABORATOR_FAILURE,
        error
      };
      expect(actions.addCollaboratorFailure(error)).toEqual(expectedAction);
    });
  });
  describe('action that fetches all users and Collaborators', () => {
    it('should fetch all users', () => {
      const users = [
        {
          username: 'jchinonso',
          name: 'johnson chinonso',
          email: 'johnson.chinonso@example.com',
          userId: '2937829782973'
        }
      ];
      const expectedAction = {
        type: types.FETCH_USERS_SUCCESS,
        users
      };
      expect(actions.fetchUserSuccess(users)).toEqual(expectedAction);
    });
    it('should fetch all collaborators ', () => {
      const collaborators = [
        {
          username: 'jchinonso',
          name: 'johnson chinonso',
          email: 'johnson.chinonso@example.com',
        }
      ];
      const expectedAction = {
        type: types.FETCH_COLLABORATOR_SUCCESS,
        collaborators
      };
      expect(actions.fetchCollaboratorSuccess(collaborators)).toEqual(expectedAction);
    });
  });
});

describe('collaborators asynchronous actions', () => {
  describe('action that fetches all users', () => {
    it('should make a get request to fetch all users ', async () => {
      const response = {
        status: 200,
        data: {
          allUsers: [
            {
              username: 'jchinonso',
              name: 'johnson chinonso',
              email: 'johnson.chinonso@example.com',
              userId: '2937829782973'
            }
          ]
        }
      };
      const expectedAction = {
        type: types.FETCH_USERS_SUCCESS,
        users: [
          {
            username: 'jchinonso',
            name: 'johnson chinonso',
            email: 'johnson.chinonso@example.com',
            userId: '2937829782973'
          }
        ]
      };
      axios.get = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ users: {}, expectedAction });
      await store.dispatch(actions.fetchUsers()).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(types.FETCH_USERS_SUCCESS);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
  describe('action that add and fetche collaborators', () => {
    it('should make a post request to add collaborator to todo ', async () => {
      const collaborator = {
        username: 'jchinonso',
        name: 'johnson chinonso',
        email: 'johnson.chinonso@example.com',
        userId: '2937829782973'
      };
      const response = {
        status: 201,
        data: {
          user: {
            username: 'jchinonso',
            name: 'johnson chinonso',
            email: 'johnson.chinonso@example.com',
            userId: '2937829782973'
          }
        }
      };
      const expectedAction = {
        type: types.FETCH_COLLABORATOR_SUCCESS,
        collaborator:
          {
            username: 'jchinonso',
            name: 'johnson chinonso',
            email: 'johnson.chinonso@example.com',
            userId: '2937829782973'
          }
      };
      axios.post = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ collaborator: {}, expectedAction });
      await store.dispatch(actions.addCollaboratorSuccess(collaborator)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(types.ADD_COLLABORATOR_SUCCESS);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
});
