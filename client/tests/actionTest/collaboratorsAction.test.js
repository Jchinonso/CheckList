import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';


import * as actions from '../../actions/collaboratorsAction';
import * as types from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Collaborator synchronous actions', () => {
  describe('addCollaboratorSuccess action', () => {
    it('should add collaborator to todo', () => {
      const message = 'Collaborator successfully added to todo';
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
  describe('fetchUserSuccess actions', () => {
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
      expect(actions
        .fetchUserSuccess(users))
        .toEqual(expectedAction);
    });
    describe('fetchCollaboratorSuccess', () => {
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
        expect(actions
          .fetchCollaboratorSuccess(collaborators))
          .toEqual(expectedAction);
      });
    });
  });
});

describe('collaborators asynchronous actions', () => {
  describe('fetchUsers action', () => {
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
  describe('addCollaboratorTodo actions', () => {
    it('should make a post request to add collaborator to todo ', async () => {
      const todoId = '2434234234';
      const collaborator = ['tayo']
      const response = {
        status: 201,
        data: {
          message: 'Collaborators added successfully'
        }
      };
      const expectedAction = {
        type: types.ADD_COLLABORATOR_SUCCESS,
        message: 'Collaborators added successfully'
      };
      axios.post = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ collaborator: {}, expectedAction });
      await store.dispatch(actions.addCollaboratorTodo(todoId, collaborator)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(types.ADD_COLLABORATOR_SUCCESS);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
  describe('fetchCollaborators', () => {
    it('should make a get request that' +
    'fetches all collaborators in a todo',
    async () => {
      const todoId = '238973274328479';
      const response = {
        status: 201,
        data: {
          collaborators: [{
            username: 'jchinonso',
            name: 'johnson chinonso',
            email: 'johnson.chinonso@example.com',
            userId: '2937829782973'
          }]
        }
      };
      const expectedAction = {
        type: types.FETCH_COLLABORATOR_SUCCESS,
        collaborators: [{
          username: 'jchinonso',
          name: 'johnson chinonso',
          email: 'johnson.chinonso@example.com',
          userId: '2937829782973'
        }]
      };
      axios.get = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ collaborator: {}, expectedAction });
      await store.dispatch(actions.fetchCollaborators(todoId)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(types.FETCH_COLLABORATOR_SUCCESS);
        expect(action[0]).toEqual(expectedAction);
      });
    }
    );
  });
});

